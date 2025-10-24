import React from 'react';

import type { Post } from '@/api';
import { Card } from '@/components/card';
import { FeedContent } from '@/components/feed-content';
import {
  FocusAwareStatusBar,
  ResponsiveContainer,
  Text,
  View,
} from '@/components/ui';
import { translate } from '@/lib';

type MobileFeedViewProps = {
  data: Post[];
  isPending: boolean;
  isError: boolean;
  onCreatePost: () => void;
};

/**
 * Mobile Feed View Component
 */
export function MobileFeedView({
  data,
  isPending,
  isError,
}: MobileFeedViewProps) {
  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => <Card {...item} />,
    []
  );

  if (isError) {
    return (
      <View className="flex-1">
        <FocusAwareStatusBar />
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-center text-red-600">
            {translate('errors.loading_data')}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FocusAwareStatusBar />
      <ResponsiveContainer maxWidth="2xl" className="flex-1">
        <FeedContent
          data={data || []}
          isPending={isPending}
          renderItem={renderItem}
        />
      </ResponsiveContainer>
    </View>
  );
}
