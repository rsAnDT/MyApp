import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useLoading } from '@/lib/hooks/use-loading';

import { Text } from './text';

type Props = {
  testID?: string;
};

export function LoadingModal({
  testID = 'loading-modal',
}: Props): React.ReactElement | null {
  const { isVisible, message } = useLoading();

  if (!isVisible) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(100)}
      exiting={FadeOut.duration(80)}
      pointerEvents="auto"
      className="absolute inset-0 z-50 items-center justify-center bg-black/40"
      accessibilityLabel="loading"
      accessibilityRole="alert"
      testID={testID}
    >
      <View className="min-w-[140px] items-center justify-center rounded-2xl bg-white p-4 dark:bg-neutral-900">
        <ActivityIndicator size="large" />
        {message ? (
          <Text className="mt-3 text-center text-base text-neutral-800 dark:text-white">
            {message}
          </Text>
        ) : null}
      </View>
    </Animated.View>
  );
}
