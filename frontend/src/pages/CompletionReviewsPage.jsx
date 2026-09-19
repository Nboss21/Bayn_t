import React, { useCallback, useEffect, useState } from 'react';
import { CheckCircle2, RefreshCw, XCircle } from 'lucide-react';
import { registrarService } from '../services/applicationService';

export default function CompletionReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(null);
  const [comment, setComment] = useState({});

  const load = useCallback(() => {
    setLoading(true);
    registrarService.completionReviews({ per_page: 100 }).then((result) => setReviews(result?.data || result || [])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const review = async (id, status) => {
    const reviewComment = comment[id] || '';
    if (status === 'needs_correction' && !reviewComment.trim()) return;
    setBusy(id);
    await registrarService.reviewCompletion(id, { status, review_comment: reviewComment || null });
    setBusy(null);
    load();
  };

  return (
    <div className="pb-12">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-bold text-gray-900">Completion Reviews</h1><p className="text-sm text-gray-500 mt-1">Verify attendance, marks, and curriculum before issuing results.</p></div>
        <button onClick={load} className="inline-flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm hover:bg-gray-50"><RefreshCw className="w-4 h-4" /> Refresh</button>
      </div>
      {loading ? <p className="text-sm text-gray-500">Loading reviews...</p> : reviews.length === 0 ? <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-500">No completion reviews are waiting.</div> : (
        <div className="space-y-4">{reviews.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div><h2 className="font-semibold text-gray-900">{item.student?.name || 'Student'}</h2><p className="text-sm text-gray-500">{item.class?.program || 'Program'} · {item.class?.name || 'Class'} · Teacher: {item.teacher?.name || '—'}</p></div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{item.status?.replaceAll('_', ' ')}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 my-5 text-sm"><div className="rounded-lg bg-gray-50 p-3"><span className="text-gray-500 block">Attendance</span><b>{item.snapshot?.attendance?.attendance_percentage ?? 0}%</b></div><div className="rounded-lg bg-gray-50 p-3"><span className="text-gray-500 block">Final mark</span><b>{item.snapshot?.marks?.total_weighted_score ?? 0}%</b></div><div className="rounded-lg bg-gray-50 p-3"><span className="text-gray-500 block">Curriculum</span><b>{item.snapshot?.curriculum?.completed_lessons ?? 0} / {item.snapshot?.curriculum?.total_lessons ?? 0}</b></div></div>
            {item.status !== 'approved' && <><textarea value={comment[item.id] || ''} onChange={(event) => setComment((old) => ({ ...old, [item.id]: event.target.value }))} placeholder="Add a comment if correction is needed..." className="w-full border border-gray-200 rounded-lg p-3 text-sm mb-3 min-h-20" /><div className="flex justify-end gap-2"><button disabled={busy === item.id} onClick={() => review(item.id, 'needs_correction')} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"><XCircle className="w-4 h-4" /> Request correction</button><button disabled={busy === item.id} onClick={() => review(item.id, 'approved')} className="inline-flex items-center gap-2 rounded-lg bg-[#345243] px-4 py-2 text-sm font-medium text-white hover:bg-[#2b4a3b]"><CheckCircle2 className="w-4 h-4" /> Approve and issue result</button></div></>}
          </div>
        ))}</div>
      )}
    </div>
  );
}
