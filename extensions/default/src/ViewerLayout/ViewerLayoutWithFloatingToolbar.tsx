import React from 'react';
import ViewerLayout from './index';
import FloatingToolbar from '../components/FloatingToolbar';

function ViewerLayoutWithFloatingToolbar(props: any) {
  // Render the standard layout but hide left panels and add floating toolbar
  const modifiedProps = {
    ...props,
    leftPanelClosed: true,
    leftPanels: [],
  };

  const ViewerComponent = ViewerLayout as any;

  return (
    <div className="relative w-full h-full">
      {/* Standard ViewerLayout */}
      <ViewerComponent {...modifiedProps} />

      {/* Floating Toolbar Overlay */}
      <FloatingToolbar
        servicesManager={props.servicesManager}
        commandsManager={props.commandsManager}
        extensionManager={props.extensionManager}
      />
    </div>
  );
}

export default ViewerLayoutWithFloatingToolbar;
