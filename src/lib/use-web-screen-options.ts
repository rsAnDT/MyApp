import { Platform } from 'react-native';

/**
 * Hook để lấy screen options cho web
 * Tự động ẩn header và back button trên web
 *
 * @example
 * ```tsx
 * // Sử dụng trong screen
 * <Stack.Screen options={useWebScreenOptions({ title: 'Add Post' })} />
 * ```
 */
export function useWebScreenOptions(options: {
  title: string;
  headerBackTitle?: string;
  headerRight?: () => React.ReactNode;
}) {
  if (Platform.OS === 'web') {
    return {
      title: options.title,
      headerShown: false, // Ẩn toàn bộ header trên web
    };
  }

  // Mobile giữ nguyên options
  return {
    title: options.title,
    headerBackTitle: options.headerBackTitle,
    headerRight: options.headerRight,
  };
}

/**
 * Helper function để lấy screen options cho web (non-hook version)
 * Sử dụng khi không thể dùng hook (ví dụ: trong object literal)
 */
export function getWebScreenOptions(options: {
  title: string;
  headerBackTitle?: string;
  headerRight?: () => React.ReactNode;
}) {
  if (Platform.OS === 'web') {
    return {
      title: options.title,
      headerShown: false,
    };
  }

  return {
    title: options.title,
    headerBackTitle: options.headerBackTitle,
    headerRight: options.headerRight,
  };
}
