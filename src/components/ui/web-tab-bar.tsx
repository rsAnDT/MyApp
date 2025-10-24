import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

/**
 * Custom Tab Bar for Web
 * Modern sidebar navigation for desktop experience
 */
export function WebTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View className="flex-row items-center justify-center border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <View className="mx-auto flex w-full max-w-7xl flex-row items-center justify-center gap-1 px-4 py-2">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className={`flex-1 items-center justify-center rounded-lg px-4 py-2 transition-colors ${
                isFocused
                  ? 'bg-blue-50 dark:bg-blue-900/20'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              <View className="flex-row items-center gap-2">
                {options.tabBarIcon &&
                  options.tabBarIcon({
                    focused: isFocused,
                    color: isFocused ? '#3b82f6' : '#6b7280',
                    size: 20,
                  })}
                <Text
                  className={`text-sm font-medium ${
                    isFocused
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {typeof label === 'string' ? label : ''}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
