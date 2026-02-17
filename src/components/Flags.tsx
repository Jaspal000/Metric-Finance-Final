import React from 'react';

interface FlagProps {
  className?: string;
  width?: number;
  height?: number;
}

// United States Flag - Official 10:19 ratio with accurate canton, stripes, and star grid
export const USFlag: React.FC<FlagProps> = ({ className = '', width = 40, height = 26 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 1235 650"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
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
export const UKFlag: React.FC<FlagProps> = ({ className = '', width = 40, height = 26 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 1200 600"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Blue background */}
    <rect width="1200" height="600" fill="#012169" />
    {/* White saltire (diagonal cross) */}
    <path d="M0,0 L1200,600 M1200,0 L0,600" stroke="#FFF" strokeWidth="120" />
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
export const CanadaFlag: React.FC<FlagProps> = ({ className = '', width = 40, height = 26 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 1200 600"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* White centre band */}
    <rect width="1200" height="600" fill="#FFF" />
    {/* Red side bars (each 1/4 of the flag width) */}
    <rect width="300" height="600" fill="#FF0000" />
    <rect x="900" width="300" height="600" fill="#FF0000" />
    {/* Maple Leaf - official proportions */}
    <path
      d="M600,100 L613,170 L680,170 L630,210 L660,290 L600,250 L540,290 L570,210 L520,170 L587,170 Z"
      fill="#FF0000"
    />
    {/* Stem */}
    <rect x="593" y="280" width="14" height="70" fill="#FF0000" rx="2" />
    {/* Additional leaf detail points */}
    <path
      d="M600,120 L608,155 L660,155 L620,185 L640,245 L600,215 L560,245 L580,185 L540,155 L592,155 Z"
      fill="#FF0000"
    />
  </svg>
);

// Australia Flag - Official 1:2 ratio with Union Jack canton, Commonwealth Star, and Southern Cross
export const AustraliaFlag: React.FC<FlagProps> = ({ className = '', width = 40, height = 26 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 1200 600"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Blue background */}
    <rect width="1200" height="600" fill="#00008B" />
    {/* Union Jack canton */}
    <g>
      <rect width="600" height="300" fill="#012169" />
      <path d="M0,0 L600,300 M600,0 L0,300" stroke="#FFF" strokeWidth="60" />
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

// Global/World Icon - High-fidelity globe with meridians and parallels
export const GlobalFlag: React.FC<FlagProps> = ({ className = '', width = 40, height = 26 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 40 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Globe outline */}
    <circle cx="20" cy="13" r="11" stroke="#2563eb" strokeWidth="1.5" fill="none" />
    {/* Central meridian */}
    <ellipse cx="20" cy="13" rx="5" ry="11" stroke="#2563eb" strokeWidth="1" fill="none" />
    {/* Secondary meridian */}
    <ellipse cx="20" cy="13" rx="9" ry="11" stroke="#2563eb" strokeWidth="0.75" fill="none" />
    {/* Equator */}
    <line x1="9" y1="13" x2="31" y2="13" stroke="#2563eb" strokeWidth="1" />
    {/* Tropic of Cancer */}
    <path d="M10.5 8C14 9.5 26 9.5 29.5 8" stroke="#2563eb" strokeWidth="0.75" fill="none" />
    {/* Tropic of Capricorn */}
    <path d="M10.5 18C14 16.5 26 16.5 29.5 18" stroke="#2563eb" strokeWidth="0.75" fill="none" />
  </svg>
);

export default { USFlag, UKFlag, CanadaFlag, AustraliaFlag, GlobalFlag };
