import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar, ResponsiveContainer } from '@/components/ui';

type MobileLoginViewProps = {
  onSubmit: LoginFormProps['onSubmit'];
};

/**
 * Mobile Login View Component
 */
export function MobileLoginView({ onSubmit }: MobileLoginViewProps) {
  return (
    <ResponsiveContainer maxWidth="md" className="flex-1">
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </ResponsiveContainer>
  );
}
