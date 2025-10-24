import React from 'react';

import { ResponsiveView } from '@/components/ui';

import { MobileStyleView } from './mobile-style-view';
import { WebStyleView } from './web-style-view';

/**
 * Style Screen Component - tự động xử lý mobile/web views
 */
export function StyleScreen() {
  return <ResponsiveView mobile={<MobileStyleView />} web={<WebStyleView />} />;
}
