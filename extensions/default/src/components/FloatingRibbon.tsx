import React, { useState } from 'react';
import { Toolbar } from '../Toolbar/Toolbar';
import { Icons } from '@ohif/ui-next';

interface FloatingRibbonProps {
  servicesManager?: any;
  commandsManager?: any;
  extensionManager?: any;
}

function FloatingRibbon({ servicesManager, commandsManager, extensionManager }: FloatingRibbonProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg">
        {/* Collapse/Expand Button */}
        <div className="flex justify-center p-2 border-b border-border">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-muted rounded transition-colors"
            title={isCollapsed ? 'Expand Ribbon' : 'Collapse Ribbon'}
          >
            <Icons.ChevronLeft
              className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Ribbon Content */}
        {!isCollapsed && (
          <div className="flex flex-col items-center p-2 space-y-2 min-w-[64px]">
            <Toolbar buttonSection="primary" />
          </div>
        )}
      </div>
    </div>
  );
}

export default FloatingRibbon;
