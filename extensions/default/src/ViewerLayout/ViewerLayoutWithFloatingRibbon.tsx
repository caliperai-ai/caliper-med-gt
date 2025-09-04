import React from 'react';
import ViewerLayout from './index';
import FloatingRibbon from '../components/FloatingRibbon';

function ViewerLayoutWithFloatingRibbon(props) {
  return (
    <div className="relative h-full w-full">
      <ViewerLayout {...props} />
      <FloatingRibbon
        servicesManager={props.servicesManager}
        commandsManager={props.commandsManager}
        extensionManager={props.extensionManager}
      />
    </div>
  );
}

export default ViewerLayoutWithFloatingRibbon;
