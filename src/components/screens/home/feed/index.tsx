import React from 'react';

import type { Post } from '@/api';
import { ResponsiveView } from '@/components/ui';

import { MobileFeedView } from './mobile-feed-view';
import { WebFeedView } from './web-feed-view';

type FeedScreenProps = {
  data: Post[];
  isPending: boolean;
  isError: boolean;
  onCreatePost: () => void;
};

/**
 * Feed Screen Component - tự động xử lý mobile/web views
 */
export function FeedScreen(props: FeedScreenProps) {
  return (
    <ResponsiveView
      mobile={<MobileFeedView {...props} />}
      web={<WebFeedView {...props} />}
    />
  );
}
