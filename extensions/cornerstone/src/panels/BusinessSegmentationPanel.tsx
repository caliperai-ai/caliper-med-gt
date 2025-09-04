import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icons } from '@ohif/ui-next';
import { useActiveViewportSegmentationRepresentations } from '../hooks/useActiveViewportSegmentationRepresentations';
import { useSystem } from '@ohif/core/src';

export default function BusinessSegmentationPanel({ children }: withAppTypes) {
  const { t } = useTranslation();
  const { commandsManager, servicesManager } = useSystem();
  const { customizationService } = servicesManager.services;

  const { segmentationsWithRepresentations, disabled } =
    useActiveViewportSegmentationRepresentations();

  // Business-friendly handlers
  const handlers = {
    onCreateSegmentation: () => {
      commandsManager.run('createSegmentation');
    },
    onSegmentationClick: (segmentationId: string) => {
      commandsManager.run('setActiveSegmentation', { segmentationId });
    },
    onAddSegment: (segmentationId: string) => {
      commandsManager.run('addSegment', { segmentationId });
    },
    onSegmentClick: (segmentationId: string, segmentIndex: number) => {
      commandsManager.run('setActiveSegmentAndCenter', { segmentationId, segmentIndex });
    },
    onSegmentEdit: (segmentationId: string, segmentIndex: number) => {
      commandsManager.run('editSegmentLabel', { segmentationId, segmentIndex });
    },
    onSegmentDelete: (segmentationId: string, segmentIndex: number) => {
      commandsManager.run('deleteSegment', { segmentationId, segmentIndex });
    },
    onExportSegmentation: (segmentationId: string) => {
      commandsManager.run('downloadSegmentation', { segmentationId });
    },
  };

  const renderSegmentationCard = (segmentationData: any) => {
    const { segmentation } = segmentationData;
    const { segments, segmentationId, label } = segmentation;

    return (
      <div key={segmentationId} className="bg-card border border-border rounded-lg p-4 space-y-4">
        {/* Segmentation Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <div>
              <h4 className="font-medium text-foreground">{label || `Segmentation ${segmentationId.slice(-4)}`}</h4>
              <p className="text-xs text-muted-foreground">{segments?.length || 0} segments</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlers.onExportSegmentation(segmentationId)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <Icons.Download className="w-4 h-4 text-accent hover:text-primary" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlers.onSegmentationClick(segmentationId)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <Icons.EyeVisible className="w-4 h-4 text-success hover:text-primary" />
            </Button>
          </div>
        </div>

        {/* Add Segment Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlers.onAddSegment(segmentationId)}
          className="w-full justify-center text-foreground"
          disabled={disabled}
        >
          <Icons.Plus className="w-4 h-4 mr-2 text-primary" />
          Add Segment
        </Button>

        {/* Segments List */}
        {segments && segments.length > 0 && (
          <div className="space-y-2">
            <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Segments
            </h5>
            <div className="space-y-1">
              {segments.map((segment: any, index: number) => (
                <div
                  key={segment.segmentIndex}
                  className="flex items-center justify-between p-2 bg-muted/50 rounded-md hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => handlers.onSegmentClick(segmentationId, segment.segmentIndex)}
                >
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-sm border border-border"
                      style={{ backgroundColor: segment.color || '#3b82f6' }}
                    ></div>
                    <span className="text-sm text-foreground">
                      {segment.label || `Segment ${segment.segmentIndex}`}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlers.onSegmentEdit(segmentationId, segment.segmentIndex);
                      }}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <Icons.Rename className="w-3 h-3 text-accent hover:text-primary" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlers.onSegmentDelete(segmentationId, segment.segmentIndex);
                      }}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    >
                      <Icons.Trash className="w-3 h-3 text-destructive hover:text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="business-segmentation-panel h-full flex flex-col bg-background">
      {/* Panel Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Segmentations</h3>
          <Button
            variant="default"
            size="sm"
            onClick={handlers.onCreateSegmentation}
            disabled={disabled}
            className="text-primary-foreground"
          >
            <Icons.Plus className="w-4 h-4 mr-2 text-white" />
            New
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Manage and analyze medical image segmentations
        </p>
      </div>

      {/* Segmentations List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {segmentationsWithRepresentations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Icons.TabSegmentation className="w-8 h-8 text-muted-foreground" />
            </div>
            <h4 className="text-foreground font-medium mb-2">No segmentations</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first segmentation to start analyzing medical images
            </p>
            <Button
              variant="default"
              onClick={handlers.onCreateSegmentation}
              disabled={disabled}
              className="text-primary-foreground"
            >
              <Icons.Plus className="w-4 h-4 mr-2 text-white" />
              Create Segmentation
            </Button>
          </div>
        ) : (
          <>
            {segmentationsWithRepresentations.map(renderSegmentationCard)}
          </>
        )}
      </div>

      {children}
    </div>
  );
}
