import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar, Text, View } from '@/components/ui';
import { translate } from '@/lib';

type WebLoginViewProps = {
  onSubmit: LoginFormProps['onSubmit'];
};

/**
 * Web Login View Component
 */
export function WebLoginView({ onSubmit }: WebLoginViewProps) {
  return (
    <View
      style={{ flex: 1 }}
      className="flex items-center justify-center bg-gray-50 dark:bg-gray-900"
    >
      <FocusAwareStatusBar />
      <View className="w-full max-w-md px-4">
        {/* Web Header */}
        <View className="mb-8 text-center">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">
            {translate('login.welcome')}
          </Text>
          <Text className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {translate('login.welcome_subtitle')}
          </Text>
        </View>

        {/* Login Form */}
        <View className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <LoginForm onSubmit={onSubmit} />
        </View>

        {/* Footer */}
        <View className="mt-6 text-center">
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            {translate('login.footer.agree')}{' '}
            <Text className="cursor-pointer text-blue-600 hover:text-blue-500">
              {translate('login.footer.terms')}
            </Text>{' '}
            {translate('login.footer.and')}{' '}
            <Text className="cursor-pointer text-blue-600 hover:text-blue-500">
              {translate('login.footer.privacy')}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
