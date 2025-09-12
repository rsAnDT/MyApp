import * as React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { translate } from '@/lib';
import { useNetworkError } from '@/lib/hooks/use-network-error';

import { Button } from './button';
import { Text } from './text';

type Props = {
  testID?: string;
};

export function NetworkErrorModal({
  testID = 'network-error-modal',
}: Props): React.ReactElement | null {
  const { isVisible, message, hide } = useNetworkError();

  if (!isVisible) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(100)}
      exiting={FadeOut.duration(80)}
      pointerEvents="auto"
      className="absolute inset-0 z-50 items-center justify-center bg-black/40"
      accessibilityLabel="network-error"
      accessibilityRole="alert"
      testID={testID}
    >
      <View className="mx-6 w-full max-w-[360px] items-center justify-center rounded-2xl bg-white p-5 dark:bg-neutral-900">
        <Text className="mb-2 text-center text-lg font-bold text-neutral-900 dark:text-white">
          {translate('network.title')}
        </Text>
        <Text className="mb-4 text-center text-base text-neutral-800 dark:text-neutral-200">
          {message || translate('network.message')}
        </Text>
        <Button label={translate('network.ok')} onPress={hide} />
      </View>
    </Animated.View>
  );
}
