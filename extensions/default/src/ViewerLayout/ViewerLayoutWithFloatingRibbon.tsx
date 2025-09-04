import React from 'react';
import ViewerLayout from './index';
import FloatingRibbon from '../components/FloatingRibbon';
import FloatingHeader from '../components/FloatingHeader';
import { useAppConfig } from '@state';

function ViewerLayoutWithFloatingRibbon(props) {
  const [appConfig] = useAppConfig();

  return (
    <div className="relative h-full w-full">
      {/* Regular ViewerLayout - now handles header hiding internally */}
      <ViewerLayout {...props} />
      
      {/* Add floating header overlay */}
      <FloatingHeader appConfig={appConfig} />
      
      {/* Add floating ribbon overlay */}
      <FloatingRibbon
        servicesManager={props.servicesManager}
        commandsManager={props.commandsManager}
        extensionManager={props.extensionManager}
      />
    </div>
  );
}

export default ViewerLayoutWithFloatingRibbon;
