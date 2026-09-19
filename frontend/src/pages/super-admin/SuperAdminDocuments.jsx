import React, { useEffect, useState } from 'react';
import { Award, ExternalLink, RefreshCw, AlertCircle, Search, Filter } from 'lucide-react';
import { registrarService, studentService } from '../../services/applicationService';
import { toUserMessage } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const STATUS_ELIGIBLE = ['completed', 'graduated'];

function StatusBadge({ status }) {
  const colors = {
    completed: 'bg-blue-50 text-blue-700 border-blue-200',
    graduated: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    active: 'bg-gray-50 text-gray-600 border-gray-200',
    suspended: 'bg-red-50 text-red-600 border-red-200',
  };
  const cls = colors[status] || 'bg-gray-50 text-gray-600 border-gray-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function SuperAdminDocuments() {
  const toast = useToast();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [generating, setGenerating] = useState({});
  const [certUrls, setCertUrls] = useState({});

  const showToast = (msg, type = 'success') => {
    if (type === 'error') toast.error(msg);
    else toast.success(msg);
  };

  const loadStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await registrarService.students({ per_page: 100 });
      setStudents(res?.data || res || []);
    } catch (err) {
      setError(toUserMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadStudents(); }, []);

  const handleGenerate = async (student) => {
    setGenerating((prev) => ({ ...prev, [student.id]: true }));
    try {
      await studentService.generateCertificate(student.id);
      const result = await studentService.certificate(student.id);
      setCertUrls((prev) => ({ ...prev, [student.id]: result?.temporary_url }));
      showToast(`Certificate generated for ${student.user?.name || 'student'}`);
    } catch (err) {
      showToast(toUserMessage(err), 'error');
    } finally {
      setGenerating((prev) => ({ ...prev, [student.id]: false }));
    }
  };

  const handleView = async (student) => {
    const viewer = window.open('', '_blank');
    try {
      const pdf = await studentService.certificateFile(student.id);
      const url = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));
      if (viewer) viewer.location.href = url;
      else window.open(url, '_blank');
      setTimeout(() => URL.revokeObjectURL(url), 120000);
    } catch (err) {
      viewer?.close();
      showToast(toUserMessage(err, 'The certificate could not be opened.'), 'error');
    }
  };

  const filtered = students.filter((s) => {
    const name = (s.user?.name || s.name || '').toLowerCase();
    const program = (s.application?.program?.name || '').toLowerCase();
    const q = search.toLowerCase();
    const matchesSearch = !q || name.includes(q) || program.includes(q);
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Super Admin Workspace</span>
        <span>/</span>
        <span className="font-medium text-gray-900">Certificates</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] mb-1 flex items-center gap-2">
            <Award className="w-6 h-6 text-[#4A5D4E]" />
            Student Certificates
          </h1>
          <p className="text-sm text-gray-500">Generate and view graduation certificates for completed students.</p>
        </div>
        <button
          onClick={loadStudents}
          className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or program…"
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
        <div className="relative">
          <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 appearance-none bg-white"
          >
            <option value="all">All statuses</option>
            <option value="completed">Completed</option>
            <option value="graduated">Graduated</option>
            <option value="active">Active</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <p className="text-sm text-gray-500">{error}</p>
            <button onClick={loadStudents} className="text-sm font-medium text-[#4A5D4E] underline">Retry</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Award className="w-10 h-10 text-gray-300" />
            <p className="text-sm text-gray-400 font-medium">No students match your filters</p>
            <p className="text-xs text-gray-400">Try adjusting the search or status filter</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#fafafa] border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Student</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Program</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((student) => {
                const isEligible = STATUS_ELIGIBLE.includes(student.status);
                const hasCert = Boolean(certUrls[student.id]);
                const isGenerating = generating[student.id];
                return (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#111827]">{student.user?.name || student.name || `Student #${student.id}`}</div>
                      <div className="text-xs text-gray-400">ID: {student.id}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {student.application?.program?.name || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={student.status || 'active'} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {isEligible && (
                          <button
                            onClick={() => handleGenerate(student)}
                            disabled={isGenerating}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#4A5D4E] hover:bg-[#3D4C40] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isGenerating ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : (
                              <Award className="w-3 h-3" />
                            )}
                            {hasCert ? 'Regenerate' : 'Generate'}
                          </button>
                        )}
                        <button
                          onClick={() => handleView(student)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <p className="mt-4 text-xs text-gray-400">
        Only <strong>Completed</strong> or <strong>Graduated</strong> students are eligible for certificate generation.
      </p>
    </div>
  );
}
