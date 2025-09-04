import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { 
  Button, 
  Icons, 
  useModal,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@ohif/ui-next';
import { useSystem } from '@ohif/core';
import HeaderPatientInfo from '../ViewerLayout/HeaderPatientInfo';
import { PatientInfoVisibility } from '../ViewerLayout/HeaderPatientInfo/HeaderPatientInfo';
import { preserveQueryParameters } from '@ohif/app';
import { Types } from '@ohif/core';

interface FloatingHeaderProps {
  appConfig: any;
}

function FloatingHeader({ appConfig }: FloatingHeaderProps) {
  const { servicesManager, extensionManager, commandsManager } = useSystem();
  const { customizationService, uiNotificationService } = servicesManager.services;
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { show } = useModal();

  const isSegmentationMode = location.pathname.includes('segmentation');

  const toggleRightPanel = () => {
    commandsManager.run('toggleRightPanel');
  };

  const onClickReturnButton = () => {
    const { pathname } = location;
    const dataSourceIdx = pathname.indexOf('/', 1);

    const dataSourceName = pathname.substring(dataSourceIdx + 1);
    const existingDataSource = extensionManager.getDataSources(dataSourceName);

    const searchQuery = new URLSearchParams();
    if (dataSourceIdx !== -1 && existingDataSource) {
      searchQuery.append('datasources', pathname.substring(dataSourceIdx + 1));
    }
    preserveQueryParameters(searchQuery);

    navigate({
      pathname: '/',
      search: decodeURIComponent(searchQuery.toString()),
    });
  };

  const AboutModal = customizationService.getCustomization(
    'ohif.aboutModal'
  ) as Types.MenuComponentCustomization;

  const UserPreferencesModal = customizationService.getCustomization(
    'ohif.userPreferencesModal'
  ) as Types.MenuComponentCustomization;

  const menuOptions = [
    {
      title: AboutModal?.menuTitle ?? t('Header:About'),
      icon: 'info',
      onClick: () =>
        show({
          content: AboutModal,
          title: AboutModal?.title ?? t('AboutModal:About OHIF Viewer'),
          containerClassName: AboutModal?.containerClassName ?? 'max-w-md',
        }),
    },
    {
      title: UserPreferencesModal.menuTitle ?? t('Header:Preferences'),
      icon: 'settings',
      onClick: () =>
        show({
          content: UserPreferencesModal,
          title: UserPreferencesModal.title ?? t('UserPreferencesModal:User preferences'),
          containerClassName:
            UserPreferencesModal?.containerClassName ?? 'flex max-w-4xl p-6 flex-col',
        }),
    },
  ];

  if (appConfig.oidc) {
    menuOptions.push({
      title: t('Header:Logout'),
      icon: 'power-off',
      onClick: async () => {
        navigate(`/logout?redirect_uri=${encodeURIComponent(window.location.href)}`);
      },
    });
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-12 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-4">
        {/* Left side - Logo */}
        <div className="flex items-center">
          <div
            className={classNames(
              'flex items-center',
              appConfig.showStudyList && 'cursor-pointer'
            )}
            onClick={appConfig.showStudyList ? onClickReturnButton : undefined}
          >
            {appConfig.showStudyList && (
              <Icons.ArrowLeft className="text-white mr-2 h-6 w-6 hover:text-primary-light" />
            )}
            <div className="text-white">
              {appConfig.whiteLabeling?.createLogoComponentFn?.(React, {}) || <Icons.OHIFLogo />}
            </div>
          </div>
        </div>

        {/* Right side - Patient Info & Controls */}
        <div className="flex items-center space-x-4">
          {/* Patient Info */}
          {appConfig.showPatientInfo !== PatientInfoVisibility.DISABLED && (
            <div className="text-white text-sm bg-black/30 rounded px-2 py-1 backdrop-blur-sm">
              <HeaderPatientInfo
                servicesManager={servicesManager}
                appConfig={appConfig}
              />
            </div>
          )}

          {/* Separator */}
          <div className="h-6 border-r border-white/30"></div>

          {/* Action Controls */}
          <div className="flex items-center space-x-2">
            {/* Segmentation Panel Toggle - only in segmentation mode */}
            {isSegmentationMode && (
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 hover:text-white p-2"
                onClick={toggleRightPanel}
                title="Toggle Segmentation Panel"
              >
                <Icons.ChevronRight className="h-4 w-4" />
              </Button>
            )}

            {/* Undo/Redo */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 hover:text-white p-2"
                onClick={() => {
                  commandsManager.run('undo');
                }}
                title="Undo"
              >
                <Icons.Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 hover:text-white p-2"
                onClick={() => {
                  commandsManager.run('redo');
                }}
                title="Redo"
              >
                <Icons.Redo className="h-4 w-4" />
              </Button>
            </div>

            {/* Settings Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 hover:text-white p-2"
                  title="Settings"
                >
                  <Icons.GearSettings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {menuOptions.map((option, index) => (
                  <DropdownMenuItem
                    key={index}
                    onSelect={option.onClick}
                    className="flex items-center gap-2 py-2"
                  >
                    {option.icon && (
                      <span className="flex h-4 w-4 items-center justify-center">
                        <Icons.ByName name={option.icon} />
                      </span>
                    )}
                    <span className="flex-1">{option.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FloatingHeader;
