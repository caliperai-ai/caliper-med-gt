import ViewerLayout from './ViewerLayout';
import BusinessViewerLayout from './ViewerLayout/BusinessViewerLayout';
import ViewerLayoutWithFloatingToolbar from './ViewerLayout/ViewerLayoutWithFloatingToolbar';
import ViewerLayoutWithFloatingRibbon from './ViewerLayout/ViewerLayoutWithFloatingRibbon';

/*
- Define layout for the viewer in mode configuration.
- Pass in the viewport types that can populate the viewer.
- Init layout based on the displaySets and the objects.
*/

export default function ({ servicesManager, extensionManager, commandsManager, hotkeysManager }) {
  function ViewerLayoutWithServices(props) {
    return ViewerLayout({
      servicesManager,
      extensionManager,
      commandsManager,
      hotkeysManager,
      ...props,
    });
  }

  function BusinessViewerLayoutWithServices(props) {
    return BusinessViewerLayout({
      servicesManager,
      extensionManager,
      commandsManager,
      hotkeysManager,
      ...props,
    });
  }

  function ViewerLayoutWithFloatingToolbarServices(props) {
    return ViewerLayoutWithFloatingToolbar({
      servicesManager,
      extensionManager,
      commandsManager,
      hotkeysManager,
      ...props,
    });
  }

  function ViewerLayoutWithFloatingRibbonServices(props) {
    return ViewerLayoutWithFloatingRibbon({
      servicesManager,
      extensionManager,
      commandsManager,
      hotkeysManager,
      ...props,
    });
  }

  return [
    // Original Layout Template
    {
      name: 'viewerLayout',
      id: 'viewerLayout',
      component: ViewerLayoutWithServices,
    },
    // New Business Layout Template
    {
      name: 'businessLayout',
      id: 'businessLayout',
      component: BusinessViewerLayoutWithServices,
    },
    // Floating Toolbar Layout Template
    {
      name: 'floatingToolbarLayout',
      id: 'floatingToolbarLayout',
      component: ViewerLayoutWithFloatingToolbarServices,
    },
    // Floating Ribbon Layout Template
    {
      name: 'floatingRibbonLayout',
      id: 'floatingRibbonLayout',
      component: ViewerLayoutWithFloatingRibbonServices,
    },
  ];
}
