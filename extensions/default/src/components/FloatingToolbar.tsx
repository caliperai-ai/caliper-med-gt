import React, { useState } from 'react';
import { Toolbar } from '../Toolbar/Toolbar';
import { Icons } from '@ohif/ui-next';

interface FloatingToolbarProps {
  servicesManager?: any;
  commandsManager?: any;
  extensionManager?: any;
}

function FloatingToolbar({ servicesManager, commandsManager, extensionManager }: FloatingToolbarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 80 }); // Initial position
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('drag-handle')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      className={`fixed z-50 bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg transition-all duration-200 ${
        isCollapsed ? 'w-12' : 'w-auto min-w-64'
      }`}
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header with collapse/expand and drag handle */}
      <div className="flex items-center justify-between p-2 border-b border-border drag-handle">
        <div className="text-xs font-medium text-muted-foreground select-none">
          {!isCollapsed && 'Tools & Segmentation'}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
          style={{ cursor: 'pointer' }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {isCollapsed ? (
            <Icons.ChevronRight className="w-3 h-3" />
          ) : (
            <Icons.ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </div>

      {/* Toolbar Content */}
      {!isCollapsed && (
        <div className="p-2 max-h-96 overflow-y-auto">
          <div className="flex flex-col space-y-3 max-w-xs">
            {/* Primary Tools Section */}
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground mb-2">Primary Tools</div>
              <Toolbar buttonSection="primary" />
            </div>
            
            {/* Segmentation Tools Section */}
            <div className="space-y-1 border-t border-border pt-3">
              <div className="text-xs font-medium text-muted-foreground mb-2">Segmentation</div>
              <Toolbar buttonSection="segmentationToolbox" />
            </div>
          </div>
        </div>
      )}

      {/* Collapsed state - show mini icons */}
      {isCollapsed && (
        <div className="p-1">
          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
            <Icons.Settings className="w-4 h-4 text-primary" />
          </div>
        </div>
      )}
    </div>
  );
}

export default FloatingToolbar;
