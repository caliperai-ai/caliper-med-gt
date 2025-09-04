import React, { useState } from 'react';
import { Toolbar } from '../Toolbar/Toolbar';
import { Icons, IconPresentationProvider, ToolButton } from '@ohif/ui-next';

interface FloatingRibbonProps {
  servicesManager?: any;
  commandsManager?: any;
  extensionManager?: any;
}

function FloatingRibbon({ servicesManager, commandsManager, extensionManager }: FloatingRibbonProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
      <div className="bg-background border border-input rounded-lg shadow-lg overflow-hidden">
        {/* Collapse/Expand Button */}
        <div className="flex justify-center p-2 border-b border-input bg-muted/50">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-accent hover:text-accent-foreground rounded transition-colors"
            title={isCollapsed ? 'Expand Ribbon' : 'Collapse Ribbon'}
          >
            <Icons.ChevronLeft
              className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Ribbon Content */}
        {!isCollapsed && (
          <div className="flex flex-col items-center p-2 space-y-1 w-16">
            <IconPresentationProvider
              size="medium"
              IconContainer={ToolButton}
              containerProps={{
                size: 'default',
                className: 'w-10 h-10',
              }}
            >
              <Toolbar buttonSection="primary" />
            </IconPresentationProvider>
          </div>
        )}
      </div>
    </div>
  );
}

export default FloatingRibbon;
