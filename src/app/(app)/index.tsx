import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react';

import { usePosts } from '@/api';
import { FeedScreen } from '@/components/screens/home/feed';
import { translate, useLoading } from '@/lib';

export default function Feed() {
  const { data, isPending, isError } = usePosts();
  const { show, hide } = useLoading();
  const router = useRouter();

  const handleCreatePost = React.useCallback(() => {
    router.push('/feed/add-post');
  }, [router]);

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

  return (
    <FeedScreen
      data={data || []}
      isPending={isPending}
      isError={isError}
      onCreatePost={handleCreatePost}
    />
  );
}
