import React from 'react';

import { Buttons } from '@/components/buttons';
import { Colors } from '@/components/colors';
import { Inputs } from '@/components/inputs';
import { Typography } from '@/components/typography';
import {
  FocusAwareStatusBar,
  ResponsiveContainer,
  SafeAreaView,
  ScrollView,
} from '@/components/ui';

/**
 * Mobile Style View Component
 */
export function MobileStyleView() {
  return (
    <ResponsiveContainer maxWidth="2xl" className="flex-1">
      <FocusAwareStatusBar />
      <ScrollView className="px-4">
        <SafeAreaView className="flex-1">
          <Typography />
          <Colors />
          <Buttons />
          <Inputs />
        </SafeAreaView>
      </ScrollView>
    </ResponsiveContainer>
  );
}
