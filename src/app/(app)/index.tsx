import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { Platform } from 'react-native';

import type { Post } from '@/api';
import { usePosts } from '@/api';
import { Card } from '@/components/card';
import { FeedContent } from '@/components/feed-content';
import { FeedHeader } from '@/components/feed-header';
import {
  FocusAwareStatusBar,
  ResponsiveContainer,
  Text,
  View,
} from '@/components/ui';
import { translate, useLoading } from '@/lib';

// eslint-disable-next-line max-lines-per-function
export default function Feed() {
  const { data, isPending, isError } = usePosts();
  const { show, hide } = useLoading();
  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => <Card {...item} />,
    []
  );

  const handleCreatePost = React.useCallback(() => {
    // Logic tạo bài viết - có thể navigate hoặc mở modal
    console.log('Create post clicked');
  }, []);

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

  // Mobile Layout - đơn giản với FlashList
  if (Platform.OS !== 'web') {
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

  // Web Layout - có header và grid layout
  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <FocusAwareStatusBar />
      <ResponsiveContainer maxWidth="full" className="flex-1">
        <View className="flex h-full flex-col">
          {/* Web Header */}
          <FeedHeader onCreatePost={handleCreatePost} />

          {/* Web Content */}
          <View className="flex-1">
            <FeedContent
              data={data || []}
              isPending={isPending}
              renderItem={renderItem}
            />
          </View>
        </View>
      </ResponsiveContainer>
    </View>
  );
}
