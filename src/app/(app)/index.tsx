import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

import type { Post } from '@/api';
import { usePosts } from '@/api';
import { Card } from '@/components/card';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/components/ui';
import { translate, useLoading } from '@/lib';

export default function Feed() {
  const { data, isPending, isError } = usePosts();
  const { show, hide } = useLoading();
  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => <Card {...item} />,
    []
  );

  const handleFetch = React.useCallback(async () => {
    show(translate('feed.loading'));
    try {
      await new Promise((r) => setTimeout(r, 1200));
    } finally {
      hide();
    }
  }, [show, hide]);

  useFocusEffect(
    React.useCallback(() => {
      handleFetch();
      return () => {
        hide(); // đảm bảo ẩn khi rời màn hình
      };
    }, [handleFetch, hide])
  );

  if (isError) {
    return (
      <View>
        <Text> {translate('errors.loading_data')} </Text>
      </View>
    );
  }
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        // @ts-expect-error: estimatedItemSize not yet typed in older FlashList
        estimatedItemSize={300}
      />
    </View>
  );
}
