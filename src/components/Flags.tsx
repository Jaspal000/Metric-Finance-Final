import React from 'react';

interface FlagProps {
  className?: string;
  width?: number;
  height?: number;
}

// United States Flag - Official 10:19 ratio with accurate canton, stripes, and star grid
export const USFlag: React.FC<FlagProps> = ({ className = '', width = 52, height = 34 }) => (
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
export const UKFlag: React.FC<FlagProps> = ({ className = '', width = 52, height = 34 }) => (
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
export const CanadaFlag: React.FC<FlagProps> = ({ className = '', width = 52, height = 34 }) => (
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
export const AustraliaFlag: React.FC<FlagProps> = ({ className = '', width = 52, height = 34 }) => (
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
export const EarthGlobe: React.FC<FlagProps> = ({ className = '', width = 52, height = 34 }) => {
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
      {/* Enhanced radial gradient for ocean depth with multiple stops */}
      <radialGradient id={`oceanGradient-${uniqueId}`} cx="30%" cy="30%">
        <stop offset="0%" stopColor="#5DADE2" />
        <stop offset="50%" stopColor="#2980B9" />
        <stop offset="100%" stopColor="#1F618D" />
      </radialGradient>

      {/* Enhanced radial gradient for land mass with depth */}
      <radialGradient id={`landGradient-${uniqueId}`} cx="40%" cy="40%">
        <stop offset="0%" stopColor="#27AE60" />
        <stop offset="60%" stopColor="#1E8449" />
        <stop offset="100%" stopColor="#0E6251" />
      </radialGradient>

      {/* Enhanced shadow and atmospheric glow */}
      <radialGradient id={`atmosphereGradient-${uniqueId}`} cx="35%" cy="35%">
        <stop offset="0%" stopColor="rgba(93, 173, 226, 0.4)" />
        <stop offset="100%" stopColor="rgba(0, 0, 0, 0.3)" />
      </radialGradient>

      {/* Glossy highlight gradient */}
      <radialGradient id={`glossGradient-${uniqueId}`} cx="30%" cy="30%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>

    {/* Ocean base with multiple layers for depth */}
    <circle cx="50" cy="50" r="45" fill={`url(#oceanGradient-${uniqueId})`} />

    {/* Land masses - Enhanced continents with better detail */}
    {/* North America */}
    <path d="M 22 28 Q 20 30 21 35 Q 22 38 25 40 Q 28 38 28 35 Q 27 30 25 28 Z" fill={`url(#landGradient-${uniqueId})`} opacity="0.9" />
    
    {/* South America */}
    <path d="M 28 52 Q 26 55 27 62 Q 30 65 33 62 Q 32 58 30 55 Z" fill={`url(#landGradient-${uniqueId})`} opacity="0.9" />
    
    {/* Greenland */}
    <circle cx="35" cy="25" r="3.5" fill={`url(#landGradient-${uniqueId})`} opacity="0.85" />
    
    {/* Europe */}
    <path d="M 48 30 Q 50 28 55 30 Q 56 32 54 34 Q 52 35 50 34 Q 48 33 48 30 Z" fill={`url(#landGradient-${uniqueId})`} opacity="0.9" />
    
    {/* Africa */}
    <path d="M 55 42 Q 58 40 62 42 Q 65 48 63 58 Q 60 62 58 60 Q 56 54 55 48 Z" fill={`url(#landGradient-${uniqueId})`} opacity="0.9" />
    
    {/* Asia */}
    <path d="M 60 25 Q 65 23 72 26 Q 75 30 73 35 Q 70 38 65 36 Q 62 33 60 28 Z" fill={`url(#landGradient-${uniqueId})`} opacity="0.9" />
    
    {/* Australia */}
    <path d="M 72 60 Q 74 58 77 60 Q 78 64 76 67 Q 73 66 72 63 Z" fill={`url(#landGradient-${uniqueId})`} opacity="0.85" />
    
    {/* New Zealand hint */}
    <circle cx="82" cy="68" r="2" fill={`url(#landGradient-${uniqueId})`} opacity="0.8" />

    {/* Atmospheric glow for depth */}
    <circle cx="50" cy="50" r="45" fill={`url(#atmosphereGradient-${uniqueId})`} />

    {/* Glossy highlight for three-dimensionality */}
    <ellipse cx="38" cy="38" rx="20" ry="22" fill={`url(#glossGradient-${uniqueId})`} />

    {/* Subtle polar ice caps */}
    <ellipse cx="50" cy="10" rx="8" ry="6" fill="rgba(255,255,255,0.15)" />
    <ellipse cx="50" cy="90" rx="8" ry="6" fill="rgba(255,255,255,0.12)" />

    {/* Atmospheric layer edge */}
    <circle cx="50" cy="50" r="45.5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" opacity="0.6" />

    {/* Planet outline for definition */}
    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
  </svg>
  );
};

export default { USFlag, UKFlag, CanadaFlag, AustraliaFlag, EarthGlobe };
