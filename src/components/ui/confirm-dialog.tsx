import * as React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { translate } from '@/lib';
import { useConfirmDialog } from '@/lib/hooks/use-confirm-dialog';

import { Button } from './button';
import { Text } from './text';

type Props = {
  testID?: string;
};

export function ConfirmDialog({
  testID = 'confirm-dialog',
}: Props): React.ReactElement | null {
  const { isVisible, title, description, buttons, hide } = useConfirmDialog();

  const handlePress = React.useCallback(
    (type: 'ok' | 'cancel') => {
      const action = buttons?.[type]?.onPress;
      hide();
      action?.();
    },
    [buttons, hide]
  );

  if (!isVisible) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(100)}
      exiting={FadeOut.duration(80)}
      pointerEvents="auto"
      className="absolute inset-0 z-50 items-center justify-center bg-black/40"
      accessibilityLabel="confirm-dialog"
      accessibilityRole="alert"
      testID={testID}
    >
      <View className="mx-6 w-full max-w-[380px] rounded-2xl bg-white p-5 dark:bg-neutral-900">
        {!!title && (
          <Text className="mb-2 text-center text-lg font-bold text-neutral-900 dark:text-white">
            {title}
          </Text>
        )}
        {!!description && (
          <Text className="mb-4 text-center text-base text-neutral-800 dark:text-neutral-200">
            {description}
          </Text>
        )}

        <View className="mt-2 flex-row items-center justify-center gap-3">
          <Button
            variant="secondary"
            label={buttons?.cancel?.label || translate('common.cancel')}
            onPress={() => handlePress('cancel')}
          />
          <Button
            label={buttons?.ok?.label || translate('common.ok')}
            onPress={() => handlePress('ok')}
          />
        </View>
      </View>
    </Animated.View>
  );
}
