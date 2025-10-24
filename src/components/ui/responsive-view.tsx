import React from 'react';
import { Platform, View } from 'react-native';

type ResponsiveViewProps = {
  mobile: React.ReactNode;
  web: React.ReactNode;
  className?: string;
};

/**
 * ResponsiveView component để tách biệt UI cho mobile và web
 *
 * @param mobile - Component hiển thị trên mobile
 * @param web - Component hiển thị trên web
 * @param className - CSS classes áp dụng cho container
 *
 * @example
 * <ResponsiveView
 *   mobile={<MobileFeed />}
 *   web={<WebFeed />}
 *   className="flex-1"
 * />
 */
export function ResponsiveView({
  mobile,
  web,
  className = 'flex-1',
}: ResponsiveViewProps) {
  return (
    <View style={{ flex: 1 }} className={className}>
      {Platform.OS === 'web' ? web : mobile}
    </View>
  );
}

/**
 * Hook để detect platform một cách dễ dàng
 */
export function usePlatform() {
  return {
    isWeb: Platform.OS === 'web',
    isMobile: Platform.OS !== 'web',
    platform: Platform.OS,
  };
}
