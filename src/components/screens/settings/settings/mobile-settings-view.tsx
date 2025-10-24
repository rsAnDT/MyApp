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
} from '@/components/ui';
import { Github, Rate, Share, Support, Website } from '@/components/ui/icons';
import { translate } from '@/lib';

type MobileSettingsViewProps = {
  signOut: () => void;
};

/**
 * Mobile Settings View Component
 */
// eslint-disable-next-line max-lines-per-function
export function MobileSettingsView({ signOut }: MobileSettingsViewProps) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, react-compiler/react-compiler
  const { colorScheme } = require('nativewind').useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];

  return (
    <ResponsiveContainer maxWidth="2xl" className="flex-1">
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="flex-1 px-4 pt-16 ">
          <Text className="text-xl font-bold">
            {translate('settings.title')}
          </Text>
          <ItemsContainer title="settings.generale">
            <LanguageItem />
            <ThemeItem />
          </ItemsContainer>

          <ItemsContainer title="settings.about">
            <Item
              text="settings.app_name"
              value={process.env.EXPO_PUBLIC_APP_NAME || 'MyApp'}
            />
            <Item
              text="settings.version"
              value={process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0'}
            />
          </ItemsContainer>

          <ItemsContainer title="settings.support_us">
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

          <ItemsContainer title="settings.links">
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

          <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={signOut} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </ResponsiveContainer>
  );
}
