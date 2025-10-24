import React from 'react';

import { Cover } from '@/components/cover';
import {
  Button,
  FocusAwareStatusBar,
  ResponsiveContainer,
  Text,
  View,
} from '@/components/ui';
import { translate } from '@/lib';

type WebOnboardingViewProps = {
  onComplete: () => void;
};

/**
 * Web Onboarding View Component
 */
export function WebOnboardingView({ onComplete }: WebOnboardingViewProps) {
  return (
    <View className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <FocusAwareStatusBar />
      <ResponsiveContainer maxWidth="6xl" className="flex-1">
        <View className="flex h-full items-center justify-center">
          <View className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Side - Content */}
            <View className="flex flex-col justify-center space-y-8">
              <View>
                <Text className="text-5xl font-bold text-gray-900 dark:text-white">
                  {translate('onboarding.title')}
                </Text>
                <Text className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                  {translate('onboarding.subtitle')}
                </Text>
              </View>

              <View className="space-y-4">
                <View className="flex items-center space-x-3">
                  <View className="size-2 rounded-full bg-blue-600"></View>
                  <Text className="text-lg text-gray-700 dark:text-gray-300">
                    {translate('onboarding.features.production')}
                  </Text>
                </View>
                <View className="flex items-center space-x-3">
                  <View className="size-2 rounded-full bg-blue-600"></View>
                  <Text className="text-lg text-gray-700 dark:text-gray-300">
                    {translate('onboarding.features.dx')}
                  </Text>
                </View>
                <View className="flex items-center space-x-3">
                  <View className="size-2 rounded-full bg-blue-600"></View>
                  <Text className="text-lg text-gray-700 dark:text-gray-300">
                    {translate('onboarding.features.minimal')}
                  </Text>
                </View>
                <View className="flex items-center space-x-3">
                  <View className="size-2 rounded-full bg-blue-600"></View>
                  <Text className="text-lg text-gray-700 dark:text-gray-300">
                    {translate('onboarding.features.maintained')}
                  </Text>
                </View>
              </View>

              <View className="pt-4">
                <Button
                  label={translate('onboarding.cta')}
                  onPress={onComplete}
                />
              </View>
            </View>

            {/* Right Side - Visual */}
            <View className="flex items-center justify-center">
              <View className="rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
                <Cover />
              </View>
            </View>
          </View>
        </View>
      </ResponsiveContainer>
    </View>
  );
}
