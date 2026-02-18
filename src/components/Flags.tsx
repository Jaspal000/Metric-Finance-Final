import React from 'react';

interface FlagProps {
  className?: string;
  width?: number;
  height?: number;
}

// United States Flag - Official 10:19 ratio with accurate canton, stripes, and star grid
export const USFlag: React.FC<FlagProps> = ({ className = '', width = 44, height = 28 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 1235 650"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid slice"
  >
    {/* White background for white stripes */}
    <rect width="1235" height="650" fill="#FFF" />
    {/* 13 stripes alternating red/white, 7 red 6 white */}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) =>
      i % 2 === 0 ? (
        <rect key={i} y={i * 50} width="1235" height="50" fill="#B22234" />
      ) : null
    )}
    {/* Blue canton */}
    <rect width="494" height="350" fill="#3C3B6E" />
    {/* 50 stars - 5 rows of 6 and 4 rows of 5 */}
    <g fill="#FFF">
      {/* Row 1: 6 stars */}
      {[0,1,2,3,4,5].map(c => <circle key={`r1-${c}`} cx={41 + c * 82} cy={35} r={13} />)}
      {/* Row 2: 5 stars */}
      {[0,1,2,3,4].map(c => <circle key={`r2-${c}`} cx={82 + c * 82} cy={70} r={13} />)}
      {/* Row 3: 6 stars */}
      {[0,1,2,3,4,5].map(c => <circle key={`r3-${c}`} cx={41 + c * 82} cy={105} r={13} />)}
      {/* Row 4: 5 stars */}
      {[0,1,2,3,4].map(c => <circle key={`r4-${c}`} cx={82 + c * 82} cy={140} r={13} />)}
      {/* Row 5: 6 stars */}
      {[0,1,2,3,4,5].map(c => <circle key={`r5-${c}`} cx={41 + c * 82} cy={175} r={13} />)}
      {/* Row 6: 5 stars */}
      {[0,1,2,3,4].map(c => <circle key={`r6-${c}`} cx={82 + c * 82} cy={210} r={13} />)}
      {/* Row 7: 6 stars */}
      {[0,1,2,3,4,5].map(c => <circle key={`r7-${c}`} cx={41 + c * 82} cy={245} r={13} />)}
      {/* Row 8: 5 stars */}
      {[0,1,2,3,4].map(c => <circle key={`r8-${c}`} cx={82 + c * 82} cy={280} r={13} />)}
      {/* Row 9: 6 stars */}
      {[0,1,2,3,4,5].map(c => <circle key={`r9-${c}`} cx={41 + c * 82} cy={315} r={13} />)}
    </g>
  </svg>
);

// United Kingdom Flag - Accurate Union Jack with proper diagonal offsets (1:2 ratio)
export const UKFlag: React.FC<FlagProps> = ({ className = '', width = 44, height = 28 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 1200 600"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid slice"
  >
    {/* Blue background */}
    <rect width="1200" height="600" fill="#012169" />
    {/* White saltire (diagonal cross) */}
    <path d="M0,0 L1200,600 M1200,0 L0,600" stroke="#FFF" strokeWidth="120" strokeLinecap="round" strokeLinejoin="round" />
    {/* Red saltire with proper offset (counterchanged) */}
    <clipPath id="uk-tl">
      <path d="M600,300 L0,0 L0,300 Z" />
    </clipPath>
    <clipPath id="uk-tr">
      <path d="M600,300 L1200,0 L1200,300 Z" />
    </clipPath>
    <clipPath id="uk-bl">
      <path d="M600,300 L0,600 L0,300 Z" />
    </clipPath>
    <clipPath id="uk-br">
      <path d="M600,300 L1200,600 L1200,300 Z" />
    </clipPath>
    <path d="M0,0 L1200,600" stroke="#C8102E" strokeWidth="40" clipPath="url(#uk-tl)" />
    <path d="M1200,0 L0,600" stroke="#C8102E" strokeWidth="40" clipPath="url(#uk-tr)" />
    <path d="M0,600 L1200,0" stroke="#C8102E" strokeWidth="40" clipPath="url(#uk-bl)" />
    <path d="M1200,600 L0,0" stroke="#C8102E" strokeWidth="40" clipPath="url(#uk-br)" />
    {/* White cross (St George fimbriation) */}
    <path d="M600,0 V600 M0,300 H1200" stroke="#FFF" strokeWidth="200" />
    {/* Red cross (St George) */}
    <path d="M600,0 V600 M0,300 H1200" stroke="#C8102E" strokeWidth="120" />
  </svg>
);

// Canada Flag - Official 1:2 ratio with accurate 11-point maple leaf
export const CanadaFlag: React.FC<FlagProps> = ({ className = '', width = 44, height = 28 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 1200 600"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid slice"
  >
    {/* White centre band */}
    <rect width="1200" height="600" fill="#FFF" />
    {/* Red side bars (each 1/4 of the flag width) */}
    <rect width="300" height="600" fill="#FF0000" />
    <rect x="900" width="300" height="600" fill="#FF0000" />
    {/* 11-Point Maple Leaf - accurate proportions */}
    <g transform="translate(600, 300)">
      {/* Outer points */}
      <path d="M0,-120 L25,-75 L70,-90 L40,-50 L65,-10 L30,0 L60,50 L25,35 L40,90 L0,60 L-40,90 L-25,35 L-60,50 L-30,0 L-65,-10 L-40,-50 L-70,-90 Z" fill="#FF0000" />
    </g>
  </svg>
);

// Australia Flag - Official 1:2 ratio with Union Jack canton, Commonwealth Star, and Southern Cross
export const AustraliaFlag: React.FC<FlagProps> = ({ className = '', width = 44, height = 28 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 1200 600"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid slice"
  >
    {/* Blue background */}
    <rect width="1200" height="600" fill="#00008B" />
    {/* Union Jack canton */}
    <g>
      <rect width="600" height="300" fill="#012169" />
      <path d="M0,0 L600,300 M600,0 L0,300" stroke="#FFF" strokeWidth="60" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0,0 L600,300" stroke="#C8102E" strokeWidth="20" />
      <path d="M600,0 L0,300" stroke="#C8102E" strokeWidth="20" />
      <path d="M300,0 V300 M0,150 H600" stroke="#FFF" strokeWidth="100" />
      <path d="M300,0 V300 M0,150 H600" stroke="#C8102E" strokeWidth="60" />
    </g>
    {/* Commonwealth Star (7-pointed, below Union Jack) */}
    <g transform="translate(300,450)">
      {[0,1,2,3,4,5,6].map(i => {
        const angle = (i * 360/7 - 90) * Math.PI / 180;
        const outerX = Math.cos(angle) * 45;
        const outerY = Math.sin(angle) * 45;
        const midAngle = ((i * 360/7 + 360/14) - 90) * Math.PI / 180;
        const innerX = Math.cos(midAngle) * 20;
        const innerY = Math.sin(midAngle) * 20;
        return <React.Fragment key={i}>
          <line x1={0} y1={0} x2={outerX} y2={outerY} stroke="#FFF" strokeWidth="8" />
          <line x1={0} y1={0} x2={innerX} y2={innerY} stroke="#FFF" strokeWidth="4" />
        </React.Fragment>;
      })}
      <circle cx={0} cy={0} r={12} fill="#FFF" />
    </g>
    {/* Southern Cross - 5 stars */}
    {/* Alpha Crucis (bottom) */}
    <circle cx="900" cy="480" r="14" fill="#FFF" />
    {/* Beta Crucis (left) */}
    <circle cx="780" cy="330" r="14" fill="#FFF" />
    {/* Gamma Crucis (top) */}
    <circle cx="900" cy="180" r="14" fill="#FFF" />
    {/* Delta Crucis (right) */}
    <circle cx="1020" cy="330" r="14" fill="#FFF" />
    {/* Epsilon Crucis (small, center-left) */}
    <circle cx="870" cy="360" r="8" fill="#FFF" />
  </svg>
);

// Earth Globe - Vibrant Green-and-Blue Planet with natural continents
export const EarthGlobe: React.FC<FlagProps> = ({ className = '', width = 44, height = 28 }) => {
  const uniqueId = Math.random().toString(36).substr(2, 9);
  return (
  <svg
    width={width}
    height={height}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      {/* Radial gradient for ocean depth */}
      <radialGradient id={`oceanGradient-${uniqueId}`} cx="35%" cy="35%">
        <stop offset="0%" stopColor="#4BA3FF" />
        <stop offset="100%" stopColor="#0066CC" />
      </radialGradient>

      {/* Radial gradient for land mass */}
      <radialGradient id={`landGradient-${uniqueId}`} cx="40%" cy="40%">
        <stop offset="0%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#15803D" />
      </radialGradient>

      {/* Shadow mask */}
      <radialGradient id={`shadowGradient-${uniqueId}`} cx="35%" cy="35%">
        <stop offset="0%" stopColor="rgba(0,0,0,0)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
      </radialGradient>
    </defs>

    {/* Ocean base */}
    <circle cx="50" cy="50" r="45" fill={`url(#oceanGradient-${uniqueId})`} />

    {/* Land masses - Stylized continents */}
    {/* North America */}
    <ellipse cx="25" cy="35" rx="12" ry="14" fill={`url(#landGradient-${uniqueId})`} opacity="0.95" />
    
    {/* South America */}
    <ellipse cx="30" cy="60" rx="8" ry="12" fill={`url(#landGradient-${uniqueId})`} opacity="0.95" />
    
    {/* Eurasia */}
    <ellipse cx="60" cy="30" rx="18" ry="12" fill={`url(#landGradient-${uniqueId})`} opacity="0.95" />
    
    {/* Africa */}
    <ellipse cx="62" cy="55" rx="10" ry="14" fill={`url(#landGradient-${uniqueId})`} opacity="0.95" />
    
    {/* Australia */}
    <ellipse cx="75" cy="65" rx="6" ry="7" fill={`url(#landGradient-${uniqueId})`} opacity="0.95" />

    {/* Atmospheric glow */}
    <circle cx="50" cy="50" r="45" fill={`url(#shadowGradient-${uniqueId})`} />

    {/* Highlight for glossy effect */}
    <ellipse cx="40" cy="40" rx="18" ry="20" fill="rgba(255,255,255,0.15)" />

    {/* Equator line - subtle */}
    <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

    {/* Prime meridian - subtle */}
    <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

    {/* Planet outline */}
    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
  </svg>
  );
};

export default { USFlag, UKFlag, CanadaFlag, AustraliaFlag, EarthGlobe };
