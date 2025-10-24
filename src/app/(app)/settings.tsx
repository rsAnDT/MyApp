import React from 'react';

import { SettingsScreen } from '@/components/screens/settings/settings';
import { useAuth } from '@/lib';

export default function Settings() {
  const signOut = useAuth.use.signOut();

  return <SettingsScreen signOut={signOut} />;
}
