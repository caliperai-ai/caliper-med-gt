export default {
  'viewportOverlay.topLeft': [
    {
      id: 'ViewportLabel',
      inheritsFrom: 'ohif.overlayItem',
      label: '',
      title: 'Viewport orientation',
      condition: ({ viewportId }) => {
        // Show orientation label for MPR viewports
        return viewportId && (
          viewportId.includes('mpr-axial') || 
          viewportId.includes('mpr-sagittal') || 
          viewportId.includes('mpr-coronal')
        );
      },
      contentF: ({ viewportId }) => {
        if (viewportId?.includes('mpr-axial')) return 'Axial';
        if (viewportId?.includes('mpr-sagittal')) return 'Sagittal';
        if (viewportId?.includes('mpr-coronal')) return 'Coronal';
        return '';
      },
    },
    {
      id: 'StudyDate',
      inheritsFrom: 'ohif.overlayItem',
      label: '',
      title: 'Study date',
      condition: ({ referenceInstance }) => referenceInstance?.StudyDate,
      contentF: ({ referenceInstance, formatters: { formatDate } }) =>
        formatDate(referenceInstance.StudyDate),
    },
    {
      id: 'SeriesDescription',
      inheritsFrom: 'ohif.overlayItem',
      label: '',
      title: 'Series description',
      condition: ({ referenceInstance }) => {
        return referenceInstance && referenceInstance.SeriesDescription;
      },
      contentF: ({ referenceInstance }) => referenceInstance.SeriesDescription,
    },
  ],
  'viewportOverlay.topRight': [],
  'viewportOverlay.bottomLeft': [
    {
      id: 'WindowLevel',
      inheritsFrom: 'ohif.overlayItem.windowLevel',
    },
    {
      id: 'ZoomLevel',
      inheritsFrom: 'ohif.overlayItem.zoomLevel',
      condition: props => {
        const activeToolName = props.toolGroupService.getActiveToolForViewport(props.viewportId);
        return activeToolName === 'Zoom';
      },
    },
  ],
  'viewportOverlay.bottomRight': [
    {
      id: 'InstanceNumber',
      inheritsFrom: 'ohif.overlayItem.instanceNumber',
    },
  ],
};
