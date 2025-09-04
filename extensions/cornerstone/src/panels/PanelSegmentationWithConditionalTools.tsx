import React from 'react';
import PanelSegmentation from './PanelSegmentation';
import { Toolbox } from '@ohif/extension-default';
import { useActiveViewportSegmentationRepresentations } from '../hooks/useActiveViewportSegmentationRepresentations';
import { useSystem } from '@ohif/core';

export default function PanelSegmentationWithConditionalTools(): JSX.Element {
  const { servicesManager } = useSystem();
  const { toolbarService } = servicesManager.services;
  const { segmentationsWithRepresentations } = useActiveViewportSegmentationRepresentations();

  const showTools = segmentationsWithRepresentations?.length > 0;

  return (
    <div className="flex h-full w-full flex-col">
      {showTools ? (
        <div className="border-b border-border p-2">
          <Toolbox
            buttonSectionId={toolbarService.sections.segmentationToolbox}
            title="Segmentation Tools"
          />
        </div>
      ) : null}
      <div className="flex-1 min-h-0">
        <PanelSegmentation />
      </div>
    </div>
  );
}
