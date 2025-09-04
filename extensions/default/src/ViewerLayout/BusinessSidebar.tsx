import React from 'react';
import SidePanelWithServices from '../Components/SidePanelWithServices';

function BusinessSidebar({ 
  side, 
  isExpanded, 
  servicesManager, 
  ...panelProps 
}: any) {
  
  if (!isExpanded) {
    return null;
  }

  return (
    <div className={`business-sidebar h-full bg-card border-r border-border ${side === 'right' ? 'border-l border-r-0' : ''}`}>
      <div className="h-full flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground capitalize">
            {side === 'left' ? 'Studies & Tools' : 'Analysis & Segmentation'}
          </h3>
        </div>
        
        {/* Sidebar Content */}
        <div className="flex-1 overflow-hidden">
          <SidePanelWithServices
            side={side}
            isExpanded={isExpanded}
            servicesManager={servicesManager}
            {...panelProps}
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessSidebar;
