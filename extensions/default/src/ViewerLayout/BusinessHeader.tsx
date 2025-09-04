import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Icons, useModal } from '@ohif/ui-next';
import { useSystem } from '@ohif/core';
import { Toolbar } from '../Toolbar/Toolbar';

function BusinessHeader({ 
  servicesManager, 
  appConfig, 
  hotkeysManager, 
  commandsManager 
}: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { show } = useModal();
  const { customizationService } = servicesManager.services;

  // Check if we're in segmentation mode - if so, hide the primary toolbar since it's in floating toolbar
  const currentPath = window.location.pathname;
  const currentMode = currentPath.includes('/segmentation') || currentPath.includes('segmentation') ? 'segmentation' : 'default';
  const hideToolbarInHeader = currentMode === 'segmentation';

  const onClickReturnButton = () => {
    const query = new URLSearchParams(window.location.search);
    const configUrl = query.get('configUrl');
    navigate(
      `/${configUrl ? `?configUrl=${encodeURIComponent(configUrl)}` : ''}`
    );
  };

  const menuOptions = [
    {
      title: t('Header:About'),
      icon: 'info',
      onClick: () => {
        show({
          content: () => React.createElement('div', { className: 'p-4' }, 'About CaliperMedGT'),
          title: 'About CaliperMedGT',
          containerClassName: 'max-w-md',
        });
      },
    },
    {
      title: t('Header:Preferences'),
      icon: 'settings',
      onClick: () => {
        show({
          content: () => React.createElement('div', { className: 'p-4' }, 'User Preferences'),
          title: 'User Preferences',
          containerClassName: 'max-w-4xl',
        });
      },
    },
  ];

  return (
    <header className="business-header h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
      {/* Left: Logo and Return Button */}
      <div className="flex items-center space-x-4">
        {appConfig?.showStudyList && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClickReturnButton}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icons.ArrowLeft className="w-4 h-4 mr-2 text-primary" />
            {t('Header:Studies')}
          </Button>
        )}
        
        {/* CaliperMedGT Logo */}
        <div className="flex items-center">
          <div className="text-xl font-bold text-primary">CaliperMedGT</div>
          <div className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            Medical Imaging
          </div>
        </div>
      </div>

      {/* Center: Main Toolbar - Completely hidden in segmentation mode */}
      {!hideToolbarInHeader && (
        <div className="flex-1 flex justify-center">
          <div className="flex items-center space-x-2 bg-muted rounded-lg p-1 toolbar">
            <Toolbar buttonSection="primary" />
          </div>
        </div>
      )}

      {/* Center placeholder for segmentation mode - takes full space */}
      {hideToolbarInHeader && (
        <div className="flex-1" />
      )}

      {/* Right: Actions and Menu */}
      <div className={`flex items-center space-x-2 ${hideToolbarInHeader ? 'flex-1 justify-end' : ''}`}>
        {/* Undo/Redo */}
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => commandsManager.run('undo')}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icons.ArrowLeft className="w-4 h-4 text-muted-foreground hover:text-foreground rotate-180" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => commandsManager.run('redo')}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icons.ArrowRight className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </Button>
        </div>

        {/* Secondary Toolbar */}
        <div className="border-l border-border pl-2 toolbar">
          <Toolbar buttonSection="secondary" />
        </div>

        {/* User Menu */}
        <div className="border-l border-border pl-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              show({
                content: () => (
                  <div className="space-y-2">
                    {menuOptions.map((option, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-foreground"
                        onClick={option.onClick}
                      >
                        <Icons.Info className="w-4 h-4 mr-2 text-accent" />
                        {option.title}
                      </Button>
                    ))}
                  </div>
                ),
                title: t('Header:Menu'),
                containerClassName: 'max-w-xs',
              });
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icons.Settings className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default BusinessHeader;
