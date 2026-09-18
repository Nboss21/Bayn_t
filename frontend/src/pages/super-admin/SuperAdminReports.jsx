import React, { useState, useEffect, useCallback } from 'react';
import { BarChart2, Users, BookOpen, Clock, CheckSquare, CreditCard, Download, RefreshCw, AlertCircle } from 'lucide-react';
import { adminService } from '../../services/applicationService';
import { API_BASE_URL, TOKEN_KEY, toUserMessage } from '../../services/api';

/* ── Report tab definitions ───────────────────────────────────────────── */
const REPORT_TABS = [
  { id: 'dashboard',    label: 'Overview',     icon: BarChart2,    apiType: 'dashboard',    exportable: false },
  { id: 'applications', label: 'Applications', icon: BookOpen,     apiType: 'applications', exportable: false },
  { id: 'students',     label: 'Students',     icon: Users,        apiType: 'students',     exportable: true },
  { id: 'enrollment',   label: 'Enrollment',   icon: CheckSquare,  apiType: 'enrollment',   exportable: true },
  { id: 'attendance',   label: 'Attendance',   icon: Clock,        apiType: 'attendance',   exportable: true },
  { id: 'assessments',  label: 'Assessments',  icon: CheckSquare,  apiType: 'assessments',  exportable: false },
  { id: 'performance',  label: 'Performance',  icon: BarChart2,    apiType: 'performance',  exportable: false },
  { id: 'payments',     label: 'Payments',     icon: CreditCard,   apiType: 'payments',     exportable: true },
];

function StatBox({ label, value, sub }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-3xl font-bold text-[#111827]">{value ?? '—'}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

function renderReportData(data, tabId) {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <div className="flex flex-col items-center py-16 gap-3 text-gray-400">
        <BarChart2 className="w-10 h-10 text-gray-200" />
        <p className="text-sm font-medium">No data available for this report</p>
        <p className="text-xs">Data will appear once the backend has records to report on.</p>
      </div>
    );
  }

  // If the backend returns an object of aggregates (overview / dashboard shape)
  if (typeof data === 'object' && !Array.isArray(data)) {
    const entries = Object.entries(data).filter(([, v]) => v !== null && typeof v !== 'object');
    if (entries.length > 0) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {entries.map(([key, value]) => (
            <StatBox
              key={key}
              label={key.replace(/_/g, ' ')}
              value={typeof value === 'number' ? value.toLocaleString() : String(value)}
            />
          ))}
        </div>
      );
    }
  }

  // If the backend returns an array of rows → render as table
  if (Array.isArray(data) && data.length > 0) {
    const columns = Object.keys(data[0]).filter((k) => typeof data[0][k] !== 'object');
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#fafafa] border-b border-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {col.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.slice(0, 50).map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-3 text-gray-700">
                    {row[col] !== null && row[col] !== undefined ? String(row[col]) : '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.length > 50 && (
          <p className="text-xs text-gray-400 text-center py-3">Showing first 50 of {data.length} records. Export CSV for full data.</p>
        )}
      </div>
    );
  }

  return null;
}

export default function SuperAdminReports() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentTab = REPORT_TABS.find((t) => t.id === activeTab);

  const loadReport = useCallback(async (tabId) => {
    if (reportData[tabId] !== undefined) return; // already cached
    const tab = REPORT_TABS.find((t) => t.id === tabId);
    if (!tab) return;
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.reports(tab.apiType);
      setReportData((prev) => ({ ...prev, [tabId]: data }));
    } catch (err) {
      setError(toUserMessage(err));
      setReportData((prev) => ({ ...prev, [tabId]: null }));
    } finally {
      setLoading(false);
    }
  }, [reportData]);

  useEffect(() => {
    loadReport(activeTab);
  }, [activeTab]);

  const handleRefresh = () => {
    setReportData((prev) => {
      const next = { ...prev };
      delete next[activeTab];
      return next;
    });
  };

  const getExportUrl = (apiType) => {
    const token = localStorage.getItem(TOKEN_KEY);
    return `${API_BASE_URL}/reports/${apiType}/export?token=${token}`;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] mb-1 flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-[#4A5D4E]" />
            Reports
          </h1>
          <p className="text-sm text-gray-500">School-wide analytics and exportable data across all modules.</p>
        </div>
        <div className="flex items-center gap-3">
          {currentTab?.exportable && (
            <a
              href={getExportUrl(currentTab.apiType)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#4A5D4E] hover:bg-[#3D4C40] text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </a>
          )}
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 bg-[#f3f4f6] rounded-xl p-1 mb-6 overflow-x-auto">
        {REPORT_TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-[#111827] shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-[#111827]">
            {currentTab?.label} Report
          </h2>
          {reportData[activeTab] && Array.isArray(reportData[activeTab]) && (
            <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
              {reportData[activeTab].length} records
            </span>
          )}
        </div>

        <div className="p-6">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center py-12 gap-3">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <p className="text-sm text-gray-500">{error}</p>
              <button
                onClick={handleRefresh}
                className="text-sm font-medium text-[#4A5D4E] underline underline-offset-2"
              >
                Try again
              </button>
            </div>
          ) : (
            renderReportData(reportData[activeTab], activeTab)
          )}
        </div>
      </div>
    </div>
  );
}
