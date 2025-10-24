import React from 'react';

import type { Post } from '@/api';
import { Card } from '@/components/card';
import { FeedContent } from '@/components/feed-content';
import { FeedHeader } from '@/components/feed-header';
import { FocusAwareStatusBar, Text, View } from '@/components/ui';
import { translate } from '@/lib';

type WebFeedViewProps = {
  data: Post[];
  isPending: boolean;
  isError: boolean;
  onCreatePost: () => void;
};

/**
 * Web Feed View Component
 */
export function WebFeedView({
  data,
  isPending,
  isError,
  onCreatePost,
}: WebFeedViewProps) {
  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => <Card {...item} />,
    []
  );

  if (isError) {
    return (
      <View
        style={{ flex: 1, flexDirection: 'column' }}
        className="bg-gray-50 dark:bg-gray-900"
      >
        <FocusAwareStatusBar />
        <FeedHeader onCreatePost={onCreatePost} />
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-center text-red-600">
            {translate('errors.loading_data')}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1, flexDirection: 'column' }}
      className="bg-gray-50 dark:bg-gray-900"
    >
      <FocusAwareStatusBar />
      {/* Web Header - Fixed */}
      <FeedHeader onCreatePost={onCreatePost} />

      {/* Web Content - Scrollable */}
      <View style={{ flex: 1 }}>
        <FeedContent
          data={data || []}
          isPending={isPending}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
