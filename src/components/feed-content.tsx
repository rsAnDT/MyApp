import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import type { Post } from '@/api';
import { EmptyList, ScrollView, View } from '@/components/ui';

type FeedContentProps = {
  data: Post[];
  isPending: boolean;
  renderItem: ({ item }: { item: Post }) => React.ReactElement;
};

// Mobile UI - sử dụng FlashList
function MobileFeedContent({ data, isPending, renderItem }: FeedContentProps) {
  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_: any, index: any) => `item-${index}`}
      ListEmptyComponent={<EmptyList isLoading={isPending} />}
      estimatedItemSize={300}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

// Web UI - sử dụng ScrollView với grid layout
function WebFeedContent({ data, isPending, renderItem }: FeedContentProps) {
  if (isPending) {
    return <EmptyList isLoading={isPending} />;
  }

  if (data.length === 0) {
    return <EmptyList isLoading={false} />;
  }

  return (
    <ScrollView style={webStyles.scrollView}>
      <View className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <View key={`item-${index}`} className="w-full">
            {renderItem({ item })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export function FeedContent({ data, isPending, renderItem }: FeedContentProps) {
  return Platform.OS === 'web' ? (
    <WebFeedContent data={data} isPending={isPending} renderItem={renderItem} />
  ) : (
    <MobileFeedContent
      data={data}
      isPending={isPending}
      renderItem={renderItem}
    />
  );
}

const webStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
  },
});
