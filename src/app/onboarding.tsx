import { useRouter } from 'expo-router';
import React from 'react';

import { OnboardingScreen } from '@/components/screens/auth/onboarding';
import { useIsFirstTime } from '@/lib/hooks';

export default function Onboarding() {
  const [, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();

  const handleComplete = () => {
    setIsFirstTime(false);
    router.replace('/login');
  };

  return <OnboardingScreen onComplete={handleComplete} />;
}
