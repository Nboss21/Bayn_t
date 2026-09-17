export default function SectionCard({ title, children, className = '', rightContent }) {
  return (
    <div className={`bg-white border border-[#e5e7eb] rounded-xl p-6 ${className}`}>
      {(title || rightContent) && (
        <div className="flex items-center justify-between mb-6">
          {title && <h2 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{title}</h2>}
          {rightContent && <div>{rightContent}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
