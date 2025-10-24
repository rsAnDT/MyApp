import React from 'react';

import { ResponsiveView } from '@/components/ui';

import { MobileOnboardingView } from './mobile-onboarding-view';
import { WebOnboardingView } from './web-onboarding-view';

type OnboardingScreenProps = {
  onComplete: () => void;
};

/**
 * Onboarding Screen Component - tự động xử lý mobile/web views
 */
export function OnboardingScreen(props: OnboardingScreenProps) {
  return (
    <ResponsiveView
      mobile={<MobileOnboardingView {...props} />}
      web={<WebOnboardingView {...props} />}
    />
  );
}
