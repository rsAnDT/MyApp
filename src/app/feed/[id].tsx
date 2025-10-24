import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { usePost } from '@/api';
import {
  ActivityIndicator,
  FocusAwareStatusBar,
  ResponsiveContainer,
  Text,
  View,
} from '@/components/ui';
import { getWebScreenOptions, translate } from '@/lib';

export default function Post() {
  const local = useLocalSearchParams<{ id: string }>();

  const { data, isPending, isError } = usePost({
    //@ts-ignore
    variables: { id: local.id },
  });

  if (isPending) {
    return (
      <ResponsiveContainer maxWidth="2xl" className="flex-1">
        <View className="flex-1 justify-center p-3">
          <Stack.Screen
            options={getWebScreenOptions({
              title: translate('post.title'),
              headerBackTitle: translate('post.back'),
            })}
          />
          <FocusAwareStatusBar />
          <ActivityIndicator />
        </View>
      </ResponsiveContainer>
    );
  }
  if (isError) {
    return (
      <ResponsiveContainer maxWidth="2xl" className="flex-1">
        <View className="flex-1 justify-center p-3">
          <Stack.Screen
            options={getWebScreenOptions({
              title: translate('post.title'),
              headerBackTitle: translate('post.back'),
            })}
          />
          <FocusAwareStatusBar />
          <Text className="text-center">
            {translate('errors.loading_post')}
          </Text>
        </View>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer maxWidth="2xl" className="flex-1">
      <View className="flex-1 p-3 ">
        <Stack.Screen
          options={getWebScreenOptions({
            title: translate('post.title'),
            headerBackTitle: translate('post.back'),
          })}
        />
        <FocusAwareStatusBar />
        <Text className="text-xl">{data.title}</Text>
        <Text>{data.body} </Text>
      </View>
    </ResponsiveContainer>
  );
}
