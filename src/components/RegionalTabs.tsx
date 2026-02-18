import { useState } from 'react';
import { USFlag, UKFlag, CanadaFlag, AustraliaFlag, EarthGlobe } from './Flags';
import type { Region } from '@/types';

interface RegionalTabsProps {
  onRegionChange?: (region: Region | 'all') => void;
  activeRegion?: Region | 'all';
  scrollToTop?: boolean;
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
  activeRegion: controlledRegion,
  scrollToTop = false
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
      
      // Smart scroll logic: Only scroll to top if scrollToTop prop is true
      if (scrollToTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  return (
    <div className="w-full">
      {/* Mobile: Fixed 5-Column Grid - Full Bleed Edge-to-Edge */}
      <div 
        className="md:hidden w-auto -mx-4 sm:-mx-6 px-0 overflow-visible"
        role="tablist"
        aria-label="Select region"
      >
        <div className="grid grid-cols-5 w-full justify-items-center gap-0 overflow-visible">
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
                  flex flex-col items-center justify-center gap-1.5 py-2.5 w-full
                  overflow-visible rounded-lg transition-all duration-200
                  ${isActive ? 'bg-blue-50 border-2 border-blue-600' : 'border-2 border-transparent'}
                `}
              >
                {/* Flag Icon - 20% larger */}
                <div className="flex items-center justify-center flex-shrink-0 overflow-visible">
                  <Flag 
                    width={65} 
                    height={43} 
                    className="block"
                  />
                </div>

                {/* Country Label - Centered beneath flag */}
                <span 
                  className={`
                    text-xs font-semibold transition-colors duration-200 whitespace-nowrap text-center
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

      {/* Desktop: Centered Tabs with Premium Spacing */}
      <div 
        className="hidden md:flex justify-center gap-12 py-6 px-4"
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
              className="flex flex-col items-center gap-3 cursor-pointer transition-all duration-200"
            >
              {/* Flag Container with Selection Border */}
              <div 
                className={`
                  relative overflow-visible p-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-50 border-2 border-blue-600 shadow-md' 
                    : 'border-2 border-transparent hover:border-blue-200'
                  }
                `}
              >
                <Flag 
                  width={70} 
                  height={46} 
                  className="block"
                />
              </div>

              {/* Country Label */}
              <span 
                className={`
                  text-sm font-bold transition-colors duration-200 whitespace-nowrap
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
