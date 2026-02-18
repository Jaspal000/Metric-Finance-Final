import { useState } from 'react';
import { USFlag, UKFlag, CanadaFlag, AustraliaFlag, GlobalFlag } from './Flags';
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
  { id: 'all', name: 'Global', shortName: 'All', Flag: GlobalFlag },
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
      {/* Tab Bar - Desktop & Mobile Optimized */}
      <div className="relative overflow-visible">
        {/* Mobile: Horizontal scrolling with snap */}
        <div 
          className="flex gap-2 lg:gap-8 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory lg:overflow-visible lg:justify-center"
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
                className="flex flex-col items-center gap-2 snap-center flex-shrink-0"
              >
                {/* Flag Container with Zero-Clipping Fix */}
                <div 
                  className={`
                    relative overflow-visible p-2 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-50/50 border-2 border-blue-500 shadow-sm' 
                      : 'border-2 border-transparent hover:border-blue-200'
                    }
                  `}
                >
                  <div className="overflow-visible">
                    <Flag 
                      width={32} 
                      height={20} 
                      className="block"
                    />
                  </div>
                </div>

                {/* Country Label */}
                <span 
                  className={`
                    text-xs font-semibold transition-colors duration-200 whitespace-nowrap
                    ${isActive ? 'text-blue-600' : 'text-slate-600'}
                  `}
                >
                  {region.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Fade indicators for scroll (mobile only) */}
        <div className="lg:hidden absolute left-0 top-0 bottom-10 w-8 bg-gradient-to-r from-[#f8fafc] to-transparent pointer-events-none" />
        <div className="lg:hidden absolute right-0 top-0 bottom-10 w-8 bg-gradient-to-l from-[#f8fafc] to-transparent pointer-events-none" />
      </div>

      {/* Transition indicator */}
      {isTransitioning && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default RegionalTabs;
