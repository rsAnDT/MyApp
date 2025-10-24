import React from 'react';
import { Platform, Text, View } from 'react-native';

/**
 * Web Footer Component
 * Only visible on web platform
 */
export function WebFooter() {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View className="border-t border-gray-200 bg-white py-4 dark:border-gray-700 dark:bg-gray-800">
      <View className="mx-auto w-full max-w-7xl px-4">
        <Text className="text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} dotrongan2806@gmail.com
        </Text>
      </View>
    </View>
  );
}
