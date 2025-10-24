import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { ResponsiveView } from '@/components/ui';

import { MobileLoginView } from './mobile-login-view';
import { WebLoginView } from './web-login-view';

type LoginScreenProps = {
  onSubmit: LoginFormProps['onSubmit'];
};

/**
 * Login Screen Component - tự động xử lý mobile/web views
 */
export function LoginScreen(props: LoginScreenProps) {
  return (
    <ResponsiveView
      mobile={<MobileLoginView {...props} />}
      web={<WebLoginView {...props} />}
    />
  );
}
