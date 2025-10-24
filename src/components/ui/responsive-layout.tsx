import React from 'react';
import { Platform, View } from 'react-native';

type ResponsiveLayoutProps = {
  children: React.ReactNode;
  className?: string;
  maxWidth?:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | 'full';
  centerContent?: boolean;
};

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

export function ResponsiveLayout({
  children,
  className = '',
  maxWidth = '2xl',
  centerContent = true,
}: ResponsiveLayoutProps) {
  // Trên mobile, không cần responsive layout
  if (Platform.OS !== 'web') {
    return <View className={className}>{children}</View>;
  }

  const containerClasses = centerContent
    ? `flex-1 items-center justify-center ${className}`
    : `flex-1 ${className}`;

  return (
    <View className={containerClasses}>
      <View
        className={`w-full ${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}
      >
        {children}
      </View>
    </View>
  );
}
