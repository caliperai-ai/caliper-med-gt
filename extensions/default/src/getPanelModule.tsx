import React from 'react';
import { WrappedPanelStudyBrowser } from './Panels';
import ToolbarPanel from './Panels/ToolbarPanel';
import { Toolbox } from './utils/Toolbox';
import i18n from 'i18next';

// TODO:
// - No loading UI exists yet
// - cancel promises when component is destroyed
// - show errors in UI for thumbnails if promise fails

function getPanelModule({ commandsManager, extensionManager, servicesManager }) {
  return [
    {
      name: 'seriesList',
      iconName: 'tab-studies',
      iconLabel: 'Studies',
      label: i18n.t('SidePanel:Studies'),
      component: props => (
        <WrappedPanelStudyBrowser
          {...props}
          commandsManager={commandsManager}
          extensionManager={extensionManager}
          servicesManager={servicesManager}
        />
      ),
    },
    {
      name: 'toolbarPanel',
      iconName: 'tab-linear',
      iconLabel: 'Tools',
      label: 'Tools',
      component: props => (
        <ToolbarPanel
          {...props}
          commandsManager={commandsManager}
          extensionManager={extensionManager}
          servicesManager={servicesManager}
        />
      ),
    },
    {
      name: 'segmentationToolsPanel',
      iconName: 'tab-segmentation',
      iconLabel: 'Segmentation Tools',
      label: 'Segmentation Tools',
      component: props => {
        const { toolbarService } = servicesManager.services;
        return (
          <div className="h-full bg-card border-r border-border">
            <div className="p-2">
              <Toolbox
                buttonSectionId={toolbarService.sections.segmentationToolbox}
                title="Segmentation Tools"
              />
            </div>
          </div>
        );
      },
    },
  ];
}

export default getPanelModule;
