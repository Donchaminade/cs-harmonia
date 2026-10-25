import React, { useId } from 'react';

interface SchoolLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function SchoolLogo({ className = '', size = 64, showText = false }: SchoolLogoProps) {
  const uid = useId().replace(/:/g, '');
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm select-none shrink-0" role="img" aria-label="Logo du Complexe Scolaire Harmonia"
      >
        {/* Outer Gold Laurel Wreath (Represented as elegant symmetrical arcs of gold leaves) */}
        <path
          d="M 50 160 C 20 120 20 70 55 35 C 57 33 59 36 57 38 C 28 72 28 118 53 154 C 55 157 52 161 50 160 Z"
          fill="#facc15"
        />
        <path
          d="M 150 160 C 180 120 180 70 145 35 C 143 33 141 36 143 38 C 172 72 172 118 147 154 C 145 157 148 161 150 160 Z"
          fill="#facc15"
        />
        
        {/* Laurel leaves nodes */}
        {Array.from({ length: 9 }).map((_, i) => {
          const angle = (i * 14 + 30) * (Math.PI / 180);
          const xl = 100 - 68 * Math.sin(angle);
          const yl = 100 + 68 * Math.cos(angle);
          const xr = 100 + 68 * Math.sin(angle);
          const yr = 100 + 68 * Math.cos(angle);
          
          return (
            <React.Fragment key={i}>
              {/* Left side leaf */}
              <path
                d={`M ${xl} ${yl} C ${xl-15} ${yl-5} ${xl-10} ${yl-20} ${xl} ${yl-15} C ${xl+5} ${yl-10} ${xl} ${yl} ${xl} ${yl}`}
                fill="#eab308"
                transform={`rotate(${-20 + i*10}, ${xl}, ${yl})`}
              />
              {/* Right side leaf */}
              <path
                d={`M ${xr} ${yr} C ${xr+15} ${yr-5} ${xr+10} ${yr-20} ${xr} ${yr-15} C ${xr-5} ${yr-10} ${xr} ${yr} ${xr} ${yr}`}
                fill="#eab308"
                transform={`rotate(${20 - i*10}, ${xr}, ${yr})`}
              />
            </React.Fragment>
          );
        })}

        {/* Outer Gold Border of Main Circle */}
        <circle cx="100" cy="100" r="62" fill="#eab308" />
        
        {/* Inner Blue Circle */}
        <circle cx="100" cy="100" r="56" fill="#1a365d" />
        
        {/* Thin Gold Inner Ring */}
        <circle cx="100" cy="100" r="48" stroke="#eab308" strokeWidth="1.5" fill="none" />

        {/* SVG Text Path for COMPLEXE SCOLAIRE curving on top */}
        <path id={`ct${uid}`} d="M 58 100 A 42 42 0 0 1 142 100" fill="none" stroke="none" />
        <text className="font-bold fill-white tracking-widest text-[10px]" dy="-2">
          <textPath href={`#ct${uid}`} startOffset="50%" textAnchor="middle">
            COMPLEXE SCOLAIRE
          </textPath>
        </text>

        {/* SVG Text Path for HARMONIA curving on bottom */}
        {/* To make text read left-to-right at the bottom, we draw the arc from right to left */}
        <path id={`cb${uid}`} d="M 142 100 A 42 42 0 0 1 58 100" fill="none" stroke="none" />
        <text className="font-bold fill-white tracking-widest text-[10px]" dy="9">
          <textPath href={`#cb${uid}`} startOffset="50%" textAnchor="middle">
            HARMONIA
          </textPath>
        </text>
        
        {/* Two golden dots on the side of the text */}
        <circle cx="53" cy="100" r="3" fill="#eab308" />
        <circle cx="147" cy="100" r="3" fill="#eab308" />

        {/* Centerpiece: Open Book & Seedling */}
        <g transform="translate(100, 100) scale(0.95)">
          {/* Seedling (Three golden leaves growing out) */}
          <path d="M 0 -8 C -4 -16 -12 -20 -15 -18 C -15 -12 -10 -8 0 -8" fill="#eab308" />
          <path d="M 0 -8 C 4 -16 12 -20 15 -18 C 15 -12 10 -8 0 -8" fill="#eab308" />
          <path d="M 0 -8 C 0 -22 6 -28 0 -32 C -6 -28 0 -22 0 -8" fill="#eab308" />
          
          {/* Open Book pages (White) */}
          {/* Left page */}
          <path
            d="M -2 15 C -12 11 -22 13 -26 15 C -27 5 -25 -10 -23 -15 C -15 -11 -7 -8 -2 -11 Z"
            fill="white"
            stroke="#1a365d"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Right page */}
          <path
            d="M 2 15 C 12 11 22 13 26 15 C 27 5 25 -10 23 -15 C 15 -11 7 -8 2 -11 Z"
            fill="white"
            stroke="#1a365d"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Center binding details */}
          <path d="M 0 -11 L 0 15" stroke="#1a365d" strokeWidth="1.5" />
          
          {/* Subtle pages shadow line */}
          <path d="M -23 -10 C -15 -7 -8 -5 -4 -7" stroke="#cbd5e1" strokeWidth="1" fill="none" />
          <path d="M 23 -10 C 15 -7 8 -5 4 -7" stroke="#cbd5e1" strokeWidth="1" fill="none" />
        </g>

        {/* Golden Motto Ribbon at the bottom */}
        <g transform="translate(0, 140)">
          {/* Left Ribbon tail */}
          <path d="M 35 15 L 20 28 L 35 22 Z" fill="#ca8a04" />
          {/* Right Ribbon tail */}
          <path d="M 165 15 L 180 28 L 165 22 Z" fill="#ca8a04" />
          
          {/* Ribbon center plate */}
          <path d="M 30 15 Q 100 35 170 15 L 160 5 Q 100 25 40 5 Z" fill="#facc15" />
          <path d="M 40 5 L 30 15 L 35 15 L 42 7 Z" fill="#ca8a04" />
          <path d="M 160 5 L 170 15 L 165 15 L 158 7 Z" fill="#ca8a04" />
        </g>
      </svg>
      {showText && (
        <div className="flex flex-col select-none whitespace-nowrap">
          <span className="text-lg font-bold font-display tracking-tight text-navy-950 leading-tight dark:text-white">Harmonia</span>
          <span className="text-[10px] font-semibold text-slate-600 tracking-[0.12em] uppercase leading-none dark:text-slate-300">Complexe Scolaire</span>
        </div>
      )}
    </div>
  );
}
