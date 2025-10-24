import { useRouter } from 'expo-router';
import React from 'react';

import { Cover } from '@/components/cover';
import {
  Button,
  FocusAwareStatusBar,
  ResponsiveContainer,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { translate } from '@/lib';
import { useIsFirstTime } from '@/lib/hooks';
export default function Onboarding() {
  const [, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  return (
    <ResponsiveContainer maxWidth="lg" className="flex h-full">
      <View className="flex h-full items-center justify-center">
        <FocusAwareStatusBar />
        <View className="w-full flex-1">
          <Cover />
        </View>
        <View className="justify-end ">
          <Text className="my-3 text-center text-5xl font-bold">
            {translate('onboarding.title')}
          </Text>
          <Text className="mb-2 text-center text-lg text-gray-600">
            {translate('onboarding.subtitle')}
          </Text>

          <Text className="my-1 pt-6 text-left text-lg">
            {translate('onboarding.features.production')}
          </Text>
          <Text className="my-1 text-left text-lg">
            {translate('onboarding.features.dx')}
          </Text>
          <Text className="my-1 text-left text-lg">
            {translate('onboarding.features.minimal')}
          </Text>
          <Text className="my-1 text-left text-lg">
            {translate('onboarding.features.maintained')}
          </Text>
        </View>
        <SafeAreaView className="mt-6">
          <Button
            label={translate('onboarding.cta')}
            onPress={() => {
              setIsFirstTime(false);
              router.replace('/login');
            }}
          />
        </SafeAreaView>
      </View>
    </ResponsiveContainer>
  );
}
