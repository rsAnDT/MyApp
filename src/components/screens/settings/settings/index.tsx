import React from 'react';

import { ResponsiveView } from '@/components/ui';

import { MobileSettingsView } from './mobile-settings-view';
import { WebSettingsView } from './web-settings-view';

type SettingsScreenProps = {
  signOut: () => void;
};

/**
 * Settings Screen Component - tự động xử lý mobile/web views
 */
export function SettingsScreen(props: SettingsScreenProps) {
  return (
    <ResponsiveView
      mobile={<MobileSettingsView {...props} />}
      web={<WebSettingsView {...props} />}
    />
  );
}
