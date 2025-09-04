import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { HangingProtocolService, CommandsManager } from '@ohif/core';
import { useAppConfig } from '@state';
import BusinessHeader from './BusinessHeader';
import BusinessSidebar from './BusinessSidebar';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@ohif/ui-next';
import useResizablePanels from './ResizablePanelsHook';

const resizableHandleClassName = 'w-1 bg-border hover:bg-primary/20 transition-colors';

function BusinessViewerLayout({
  // From Extension Module Params
  extensionManager,
  servicesManager,
  hotkeysManager,
  commandsManager,
  // From Modes
  viewports,
  ViewportGridComp,
  leftPanelClosed = false,
  rightPanelClosed = false,
  leftPanelResizable = true,
  rightPanelResizable = true,
  leftPanelInitialExpandedWidth = 300,
  rightPanelInitialExpandedWidth = 350,
  leftPanelMinimumExpandedWidth = 250,
  rightPanelMinimumExpandedWidth = 300,
}: any) {
  const [appConfig] = useAppConfig();
  const { panelService, hangingProtocolService } = servicesManager.services;

  const hasPanels = useCallback(
    (side: string): boolean => !!panelService.getPanels(side).length,
    [panelService]
  );

  const [hasRightPanels, setHasRightPanels] = useState(hasPanels('right'));
  const [hasLeftPanels, setHasLeftPanels] = useState(hasPanels('left'));
  const [leftPanelClosedState, setLeftPanelClosed] = useState(leftPanelClosed);
  const [rightPanelClosedState, setRightPanelClosed] = useState(rightPanelClosed);

  const [
    leftPanelProps,
    rightPanelProps,
    resizablePanelGroupProps,
    resizableLeftPanelProps,
    resizableViewportGridPanelProps,
    resizableRightPanelProps,
    onHandleDragging,
  ] = useResizablePanels({
    leftPanelInitialExpandedWidth,
    rightPanelInitialExpandedWidth,
    leftPanelMinimumExpandedWidth,
    rightPanelMinimumExpandedWidth,
    leftPanelClosed: leftPanelClosedState,
    rightPanelClosed: rightPanelClosedState,
    resizable: { left: leftPanelResizable, right: rightPanelResizable },
  });

  // Set modern body styles
  useEffect(() => {
    document.body.classList.add('bg-background');
    document.body.classList.add('text-foreground');
    document.body.classList.add('font-inter');
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('bg-background');
      document.body.classList.remove('text-foreground');
      document.body.classList.remove('font-inter');
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const getComponent = (id: string) => {
    const entry = extensionManager.getModuleEntry(id);

    if (!entry || !entry.component) {
      throw new Error(
        `${id} is not valid for an extension module or no component found from extension ${id}.`
      );
    }

    return { entry };
  };

  const getViewportComponentData = (viewportComponent: any) => {
    const { entry } = getComponent(viewportComponent.namespace);

    return {
      component: entry.component,
      isReferenceViewable: entry.isReferenceViewable,
      displaySetsToDisplay: viewportComponent.displaySetsToDisplay,
    };
  };

  useEffect(() => {
    const { unsubscribe } = panelService.subscribe(
      panelService.EVENTS.PANELS_CHANGED,
      ({ options }) => {
        setHasLeftPanels(hasPanels('left'));
        setHasRightPanels(hasPanels('right'));
        if (options?.leftPanelClosed !== undefined) {
          setLeftPanelClosed(options.leftPanelClosed);
        }
        if (options?.rightPanelClosed !== undefined) {
          setRightPanelClosed(options.rightPanelClosed);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [panelService, hasPanels]);

  const viewportComponents = viewports.map(getViewportComponentData);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Modern Business Header */}
      <BusinessHeader
        servicesManager={servicesManager}
        appConfig={appConfig}
        hotkeysManager={hotkeysManager}
        commandsManager={commandsManager}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        <ResizablePanelGroup {...resizablePanelGroupProps}>
          {/* Left Sidebar */}
          {hasLeftPanels && (
            <>
              <ResizablePanel {...resizableLeftPanelProps}>
                <BusinessSidebar
                  side="left"
                  isExpanded={!leftPanelClosedState}
                  servicesManager={servicesManager}
                  {...leftPanelProps}
                />
              </ResizablePanel>
              <ResizableHandle
                onDragging={onHandleDragging}
                disabled={!leftPanelResizable}
                className={resizableHandleClassName}
              />
            </>
          )}

          {/* Main Viewport Area */}
          <ResizablePanel {...resizableViewportGridPanelProps}>
            <div className="h-full flex flex-col bg-card rounded-lg m-2 shadow-sm border">
              <div className="flex-1 relative">
                <ViewportGridComp
                  servicesManager={servicesManager}
                  viewportComponents={viewportComponents}
                  commandsManager={commandsManager}
                />
              </div>
            </div>
          </ResizablePanel>

          {/* Right Panel */}
          {hasRightPanels && (
            <>
              <ResizableHandle
                onDragging={onHandleDragging}
                disabled={!rightPanelResizable}
                className={resizableHandleClassName}
              />
              <ResizablePanel {...resizableRightPanelProps}>
                <BusinessSidebar
                  side="right"
                  isExpanded={!rightPanelClosedState}
                  servicesManager={servicesManager}
                  {...rightPanelProps}
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

BusinessViewerLayout.propTypes = {
  extensionManager: PropTypes.shape({
    getModuleEntry: PropTypes.func.isRequired,
  }).isRequired,
  commandsManager: PropTypes.instanceOf(CommandsManager),
  servicesManager: PropTypes.object.isRequired,
  leftPanelClosed: PropTypes.bool.isRequired,
  rightPanelClosed: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  viewports: PropTypes.array,
};

export default BusinessViewerLayout;
