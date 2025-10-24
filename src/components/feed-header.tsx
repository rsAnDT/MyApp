import React from 'react';
import { Platform } from 'react-native';

import { Pressable, Text, View } from '@/components/ui';
import { translate } from '@/lib';

type FeedHeaderProps = {
  onCreatePost?: () => void;
};

// Mobile Header - đơn giản
// eslint-disable-next-line no-empty-pattern
function MobileFeedHeader({}: FeedHeaderProps) {
  return null; // Mobile không cần header riêng, sử dụng tab header
}

// Web Header - có thêm thông tin và actions
function WebFeedHeader({ onCreatePost }: FeedHeaderProps) {
  return (
    <View className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            {translate('tabs.feed')}
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            {translate('tabs.feed_subtitle')}
          </Text>
        </View>

        {onCreatePost && (
          <Pressable
            onPress={onCreatePost}
            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
          >
            <Text className="text-sm font-medium text-white">
              {translate('common.create')}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export function FeedHeader(props: FeedHeaderProps) {
  return Platform.OS === 'web' ? (
    <WebFeedHeader {...props} />
  ) : (
    <MobileFeedHeader {...props} />
  );
}
