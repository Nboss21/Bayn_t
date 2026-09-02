import React, { useRef, useState } from 'react';

const FileUploadZone = ({ icon = 'document', accept = '.jpg,.png,.pdf' }) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (f) => {
    if (f) setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    handleFile(f);
  };

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`w-full border border-dashed rounded-sm py-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
        dragging ? 'border-[#a87b52] bg-[#fdf8f3]' : 'border-gray-300 bg-white hover:border-gray-400'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {/* Icon */}
      <div className="mb-3 text-[#8a9f8b]">
        {icon === 'photo' ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
      </div>

      {file ? (
        <p className="text-[13px] text-[#6b826d] font-medium truncate max-w-[200px]">{file.name}</p>
      ) : (
        <>
          <p className="text-[13px] text-[#a87b52] font-medium">Click to upload or drag and drop</p>
          <p className="text-[11px] text-gray-400 mt-1">JPG, PNG or PDF · Max 10 MB</p>
        </>
      )}
    </div>
  );
};

export default FileUploadZone;
