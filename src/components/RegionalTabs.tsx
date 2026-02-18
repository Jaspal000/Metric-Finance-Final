import { useState } from 'react';
import { USFlag, UKFlag, CanadaFlag, AustraliaFlag, EarthGlobe } from './Flags';
import type { Region } from '@/types';

interface RegionalTabsProps {
  onRegionChange?: (region: Region | 'all') => void;
  activeRegion?: Region | 'all';
}

interface RegionTab {
  id: Region | 'all';
  name: string;
  shortName: string;
  Flag: React.FC<{ className?: string; width?: number; height?: number }>;
}

const regions: RegionTab[] = [
  { id: 'all', name: 'Global', shortName: 'All', Flag: EarthGlobe },
  { id: 'us', name: 'USA', shortName: 'US', Flag: USFlag },
  { id: 'uk', name: 'UK', shortName: 'UK', Flag: UKFlag },
  { id: 'ca', name: 'Canada', shortName: 'CA', Flag: CanadaFlag },
  { id: 'au', name: 'Australia', shortName: 'AU', Flag: AustraliaFlag },
];

const RegionalTabs: React.FC<RegionalTabsProps> = ({ 
  onRegionChange,
  activeRegion: controlledRegion 
}) => {
  const [internalRegion, setInternalRegion] = useState<Region | 'all'>('all');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeRegion = controlledRegion ?? internalRegion;

  const handleRegionClick = (region: Region | 'all') => {
    if (region === activeRegion) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setInternalRegion(region);
      onRegionChange?.(region);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  return (
    <div className="w-full">
      {/* Mobile: 5-Column Edge-to-Edge Grid */}
      <div 
        className="md:hidden w-screen -mx-4 px-4 overflow-hidden"
        role="tablist"
        aria-label="Select region"
      >
        <div className="grid grid-cols-5 gap-0 justify-between w-full">
          {regions.map((region) => {
            const isActive = activeRegion === region.id;
            const Flag = region.Flag;

            return (
              <button
                key={region.id}
                onClick={() => handleRegionClick(region.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`region-panel-${region.id}`}
                className={`
                  flex flex-col items-center justify-start gap-1.5 py-3 px-1 relative transition-all duration-200
                  ${isActive ? 'z-10' : 'z-0'}
                `}
              >
                {/* Full-Frame Selection Border - encompasses icon and label */}
                {isActive && (
                  <div className="absolute inset-0 rounded-lg border-2 border-blue-600 pointer-events-none" />
                )}

                {/* Flag Icon - Max 48px */}
                <div className="flex items-center justify-center flex-shrink-0">
                  <Flag 
                    width={48} 
                    height={30} 
                    className="block"
                  />
                </div>

                {/* Country Label - Centered, no wrapping */}
                <span 
                  className={`
                    text-[10px] font-bold transition-colors duration-200 whitespace-nowrap text-center
                    ${isActive ? 'text-blue-600' : 'text-slate-600'}
                  `}
                >
                  {region.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop: Centered Tabs */}
      <div 
        className="hidden md:flex justify-center gap-8 py-4"
        role="tablist"
        aria-label="Select region"
      >
        {regions.map((region) => {
          const isActive = activeRegion === region.id;
          const Flag = region.Flag;

          return (
            <button
              key={region.id}
              onClick={() => handleRegionClick(region.id)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`region-panel-${region.id}`}
              className="flex flex-col items-center gap-2 cursor-pointer transition-all duration-200"
            >
              {/* Flag Container with Selection Border */}
              <div 
                className={`
                  relative overflow-visible p-2 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-50 border-2 border-blue-600 shadow-md' 
                    : 'border-2 border-transparent hover:border-blue-200'
                  }
                `}
              >
                <Flag 
                  width={48} 
                  height={30} 
                  className="block"
                />
              </div>

              {/* Country Label */}
              <span 
                className={`
                  text-xs font-bold transition-colors duration-200 whitespace-nowrap
                  ${isActive ? 'text-blue-600' : 'text-slate-600'}
                `}
              >
                {region.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Transition indicator */}
      {isTransitioning && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default RegionalTabs;
