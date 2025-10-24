import React from 'react';
import { Platform, View } from 'react-native';

type ResponsiveContainerProps = {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full';
};

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

export function ResponsiveContainer({
  children,
  className = '',
  maxWidth = '2xl',
}: ResponsiveContainerProps) {
  // Trên mobile, không cần responsive container
  if (Platform.OS !== 'web') {
    return <View className={className}>{children}</View>;
  }

  return (
    <View className={`flex-1 items-center ${className}`}>
      <View className={`w-full ${maxWidthClasses[maxWidth]} mx-auto flex-1`}>
        {children}
      </View>
    </View>
  );
}
