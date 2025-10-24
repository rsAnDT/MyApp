import { useRouter } from 'expo-router';
import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar, ResponsiveContainer } from '@/components/ui';
import { confirm, translate, useAuth, useLoading } from '@/lib';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const { show, hide } = useLoading();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log(data);
    confirm({
      title: translate('confirm.login.title'),
      description: translate('confirm.login.description'),
      buttons: {
        cancel: {
          label: translate('common.cancel'),
        },
        ok: {
          label: translate('common.ok'),
          onPress: () => {
            void (async () => {
              show(translate('auth.signing_in'));
              try {
                await new Promise((r) => setTimeout(r, 3000));
                signIn({ access: 'access-token', refresh: 'refresh-token' });
                router.replace('/');
              } finally {
                hide();
              }
            })();
          },
        },
      },
    });
  };
  return (
    <ResponsiveContainer maxWidth="md" className="flex-1">
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </ResponsiveContainer>
  );
}
