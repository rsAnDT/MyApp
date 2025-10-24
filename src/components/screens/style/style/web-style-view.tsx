import React from 'react';

import { Buttons } from '@/components/buttons';
import { Colors } from '@/components/colors';
import { Inputs } from '@/components/inputs';
import { Typography } from '@/components/typography';
import {
  FocusAwareStatusBar,
  ResponsiveContainer,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { translate } from '@/lib';

/**
 * Web Style View Component
 */
export function WebStyleView() {
  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <FocusAwareStatusBar />
      <ResponsiveContainer maxWidth="6xl" className="flex-1">
        <View className="flex h-full flex-col">
          {/* Web Header */}
          <View className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
            <View className="text-center">
              <Text className="text-3xl font-bold text-gray-900 dark:text-white">
                {translate('style.title')}
              </Text>
              <Text className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {translate('style.subtitle')}
              </Text>
            </View>
          </View>

          {/* Web Content */}
          <ScrollView className="flex-1">
            <View className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
              {/* Typography Section */}
              <View className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  Typography
                </h2>
                <Typography />
              </View>

              {/* Colors Section */}
              <View className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  Colors
                </h2>
                <Colors />
              </View>

              {/* Buttons Section */}
              <View className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  Buttons
                </h2>
                <Buttons />
              </View>

              {/* Inputs Section */}
              <View className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  Inputs
                </h2>
                <Inputs />
              </View>
            </View>
          </ScrollView>
        </View>
      </ResponsiveContainer>
    </View>
  );
}
