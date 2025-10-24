import React from 'react';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import {
  colors,
  FocusAwareStatusBar,
  ResponsiveContainer,
  ScrollView,
  Text,
  View,
  WebFooter,
} from '@/components/ui';
import { Github, Rate, Share, Support, Website } from '@/components/ui/icons';
import { translate } from '@/lib';

type WebSettingsViewProps = {
  signOut: () => void;
};

/**
 * Web Settings View Component
 */
// eslint-disable-next-line max-lines-per-function
export function WebSettingsView({ signOut }: WebSettingsViewProps) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, react-compiler/react-compiler
  const { colorScheme } = require('nativewind').useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <FocusAwareStatusBar />
      <ResponsiveContainer maxWidth="4xl" className="flex-1">
        <View className="flex h-full flex-col">
          {/* Web Header */}
          <View className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {translate('settings.title')}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              {translate('settings.subtitle')}
            </Text>
          </View>

          {/* Web Content */}
          <ScrollView className="flex-1">
            <View className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
              {/* General Settings */}
              <View className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {translate('settings.generale')}
                </Text>
                <ItemsContainer>
                  <LanguageItem />
                  <ThemeItem />
                </ItemsContainer>
              </View>

              {/* About */}
              <View className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {translate('settings.about')}
                </Text>
                <ItemsContainer>
                  <Item
                    text="settings.app_name"
                    value={process.env.EXPO_PUBLIC_APP_NAME || 'MyApp'}
                  />
                  <Item
                    text="settings.version"
                    value={process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0'}
                  />
                </ItemsContainer>
              </View>

              {/* Support */}
              <View className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {translate('settings.support_us')}
                </Text>
                <ItemsContainer>
                  <Item
                    text="settings.share"
                    icon={<Share color={iconColor} />}
                    onPress={() => {}}
                  />
                  <Item
                    text="settings.rate"
                    icon={<Rate color={iconColor} />}
                    onPress={() => {}}
                  />
                  <Item
                    text="settings.support"
                    icon={<Support color={iconColor} />}
                    onPress={() => {}}
                  />
                </ItemsContainer>
              </View>

              {/* Links */}
              <View className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {translate('settings.links')}
                </Text>
                <ItemsContainer>
                  <Item text="settings.privacy" onPress={() => {}} />
                  <Item text="settings.terms" onPress={() => {}} />
                  <Item
                    text="settings.github"
                    icon={<Github color={iconColor} />}
                    onPress={() => {}}
                  />
                  <Item
                    text="settings.website"
                    icon={<Website color={iconColor} />}
                    onPress={() => {}}
                  />
                </ItemsContainer>
              </View>

              {/* Logout */}
              <View className="col-span-full rounded-lg bg-red-50 p-6 dark:bg-red-900/20">
                <ItemsContainer>
                  <Item text="settings.logout" onPress={signOut} />
                </ItemsContainer>
              </View>
            </View>
            <WebFooter />
          </ScrollView>
        </View>
      </ResponsiveContainer>
    </View>
  );
}
