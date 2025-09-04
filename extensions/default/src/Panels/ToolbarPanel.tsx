import React from 'react';
import { Toolbar } from '../Toolbar/Toolbar';

interface ToolbarPanelProps {
  servicesManager?: any;
  commandsManager?: any;
  extensionManager?: any;
}

function ToolbarPanel({ servicesManager, commandsManager, extensionManager }: ToolbarPanelProps) {
  return (
    <div className="h-full bg-card border-r border-border w-16 flex flex-col">
      {/* Vertical Ribbon - Centered Icons */}
      <div className="flex flex-col items-center py-4 space-y-2">
        <div className="flex flex-col items-center space-y-2">
          <Toolbar buttonSection="primary" />
        </div>
      </div>
    </div>
  );
}

export default ToolbarPanel;
