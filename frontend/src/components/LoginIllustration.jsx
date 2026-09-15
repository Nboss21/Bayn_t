export default function LoginIllustration() {
  return (
    <div className="w-1/2 p-4">
      <div className="w-full h-full bg-[#fbfcfb] rounded-[2rem] flex items-center justify-center relative overflow-hidden">
        <div className="relative flex items-center justify-center">
          {/* Cloud SVG */}
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-6">
             <path d="M96 35.5C96 15.8939 80.1061 0 60.5 0C45.3619 0 32.4278 9.45899 27.2023 22.8443C26.1133 22.6105 24.9774 22.4828 23.8103 22.4828C10.6596 22.4828 0 33.1424 0 46.2931C0 59.4438 10.6596 70.1034 23.8103 70.1034H91.1379C107.075 70.1034 120 57.1787 120 41.2414C120 28.5303 111.782 17.7335 100.224 14.1264C98.4116 26.2415 97.4371 35.5 96 35.5Z" fill="#E4F1F8" />
          </svg>

          {/* Lock SVG */}
          <svg width="60" height="80" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 top-4">
            {/* Lock Shackle */}
            <path d="M12 24V16C12 9.37258 17.3726 4 24 4C30.6274 4 36 9.37258 36 16V24" stroke="#79C8DF" strokeWidth="6" strokeLinecap="round" />
            {/* Lock Body */}
            <rect x="0" y="24" width="48" height="40" rx="8" fill="#79C8DF" />
            {/* Circle with checkmark */}
            <circle cx="24" cy="44" r="8" fill="white" />
            <path d="M20 44L23 47L28 41" stroke="#79C8DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
