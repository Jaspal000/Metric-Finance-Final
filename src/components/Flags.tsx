import React from 'react';

interface FlagProps {
  className?: string;
  width?: number;
  height?: number;
}

// United States Flag - Clean rectangular design (3:2 ratio)
export const USFlag: React.FC<FlagProps> = ({ className = '', width = 64, height = 42 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 960 630"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <rect width="960" height="630" fill="#B22234" />
    <g fill="#FFF">
      <rect y="48" width="960" height="48" />
      <rect y="144" width="960" height="48" />
      <rect y="240" width="960" height="48" />
      <rect y="336" width="960" height="48" />
      <rect y="432" width="960" height="48" />
      <rect y="528" width="960" height="48" />
    </g>
    <rect width="384" height="336" fill="#3C3B6E" />
    <g fill="#FFF">
      {[...Array(9)].map((_, row) => 
        [...Array(row % 2 === 0 ? 6 : 5)].map((_, col) => (
          <circle key={`${row}-${col}`} cx={32 + (row % 2 === 0 ? col * 63 : (col + 0.5) * 63)} cy={26 + row * 37.5} r="11" />
        ))
      )}
    </g>
  </svg>
);

// United Kingdom Flag - Clean rectangular design (2:1 ratio)
export const UKFlag: React.FC<FlagProps> = ({ className = '', width = 64, height = 32 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 960 480"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <rect width="960" height="480" fill="#012169" />
    <path d="M0,0 L960,480 M960,0 L0,480" stroke="#FFF" strokeWidth="96" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M0,0 L960,480 M960,0 L0,480" stroke="#C8102E" strokeWidth="64" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M480,0 V480 M0,240 H960" stroke="#FFF" strokeWidth="160" />
    <path d="M480,0 V480 M0,240 H960" stroke="#C8102E" strokeWidth="96" />
  </svg>
);

// Canada Flag - Clean rectangular design (1:2 ratio)
export const CanadaFlag: React.FC<FlagProps> = ({ className = '', width = 32, height = 64 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 300 600"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <rect width="300" height="600" fill="#FF0000" />
    <rect x="75" width="150" height="600" fill="#FFF" />
    <path d="M150,150 L165,180 L195,180 L172,202 L187,232 L150,210 L113,232 L128,202 L105,180 L135,180 Z" fill="#FF0000" />
    <path d="M150,330 L165,360 L195,360 L172,382 L187,412 L150,390 L113,412 L128,382 L105,360 L135,360 Z" fill="#FF0000" />
  </svg>
);

// Australia Flag - Clean rectangular design (1:2 ratio)
export const AustraliaFlag: React.FC<FlagProps> = ({ className = '', width = 64, height = 32 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 960 480"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <rect width="960" height="480" fill="#00008B" />
    <rect width="384" height="240" fill="#012169" />
    <path d="M0,0 L384,240 M384,0 L0,240" stroke="#FFF" strokeWidth="48" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M0,0 L384,240 M384,0 L0,240" stroke="#C8102E" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M192,0 V240 M0,120 H384" stroke="#FFF" strokeWidth="80" />
    <path d="M192,0 V240 M0,120 H384" stroke="#C8102E" strokeWidth="48" />
    <circle cx="192" cy="340" r="35" fill="#FFF" />
    {[...Array(7)].map((_, i) => {
      const angle = (i * 360 / 7 - 90) * Math.PI / 180;
      const x = 192 + Math.cos(angle) * 30;
      const y = 340 + Math.sin(angle) * 30;
      return <line key={i} x1="192" y1="340" x2={x} y2={y} stroke="#FFF" strokeWidth="4" />;
    })}
    <circle cx="840" cy="120" r="15" fill="#FFF" />
    <circle cx="720" cy="200" r="15" fill="#FFF" />
    <circle cx="840" cy="280" r="15" fill="#FFF" />
    <circle cx="960" cy="200" r="15" fill="#FFF" />
    <circle cx="900" cy="240" r="10" fill="#FFF" />
  </svg>
);

// Earth Globe - Clean rectangular representation for footer
export const EarthGlobe: React.FC<FlagProps> = ({ className = '', width = 64, height = 42 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <radialGradient id="earthGrad" cx="35%" cy="35%">
        <stop offset="0%" stopColor="#87CEEB" />
        <stop offset="70%" stopColor="#1E90FF" />
        <stop offset="100%" stopColor="#004E89" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#earthGrad)" />
    <path d="M 25 35 Q 30 33 35 35 Q 33 40 28 42 Z" fill="#228B22" />
    <path d="M 45 25 Q 52 23 58 26 Q 60 32 55 35 Q 50 33 45 32 Z" fill="#228B22" />
    <path d="M 60 45 Q 68 43 72 50 Q 70 58 65 60 Q 62 55 60 50 Z" fill="#228B22" />
    <path d="M 30 60 Q 35 58 40 62 Q 38 68 32 70 Z" fill="#228B22" />
    <ellipse cx="50" cy="50" rx="45" ry="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
  </svg>
);

// Wrapper component for dynamic flag selection
interface FlagsProps extends FlagProps {
  flag: 'us' | 'uk' | 'ca' | 'au' | 'globe';
  size?: number;
}

export const Flags: React.FC<FlagsProps> = ({ flag, className = '', width, height, size }) => {
  const displayWidth = size || width || 62;
  const displayHeight = size || height || 41;
  
  switch (flag) {
    case 'us':
      return <USFlag className={className} width={displayWidth} height={displayHeight} />;
    case 'uk':
      return <UKFlag className={className} width={displayWidth} height={displayHeight} />;
    case 'ca':
      return <CanadaFlag className={className} width={displayWidth} height={displayHeight} />;
    case 'au':
      return <AustraliaFlag className={className} width={displayWidth} height={displayHeight} />;
    case 'globe':
      return <EarthGlobe className={className} width={displayWidth} height={displayHeight} />;
    default:
      return <EarthGlobe className={className} width={displayWidth} height={displayHeight} />;
  }
};

export default { USFlag, UKFlag, CanadaFlag, AustraliaFlag, EarthGlobe, Flags };
