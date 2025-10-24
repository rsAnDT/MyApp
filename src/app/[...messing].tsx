import { Link, Stack } from 'expo-router';

import { Text, View } from '@/components/ui';
import { getWebScreenOptions, translate } from '@/lib';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={getWebScreenOptions({
          title: translate('not_found.title'),
        })}
      />
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-4 text-2xl font-bold">
          {translate('not_found.message')}
        </Text>

        <Link href="/" className="mt-4">
          <Text className="text-blue-500 underline">
            {translate('not_found.go_home')}
          </Text>
        </Link>
      </View>
    </>
  );
}
