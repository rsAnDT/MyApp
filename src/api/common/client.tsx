import { Env } from '@env';
import axios, { type AxiosError } from 'axios';
import * as Network from 'expo-network';

import { translate } from '@/lib';
import { confirm } from '@/lib/hooks/use-confirm-dialog';
import { useNetworkError } from '@/lib/hooks/use-network-error';
export const client = axios.create({
  baseURL: Env.API_URL,
});

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Check device connectivity (more reliable than error.response)
    try {
      const state = await Network.getNetworkStateAsync();
      const isOffline = !state.isConnected || !state.isInternetReachable;
      if (isOffline) {
        useNetworkError.getState().show();
      }
    } catch {
      // fallback: if axios has no response, assume a network issue
      if (!error.response) useNetworkError.getState().show();
    }

    const status = error.response?.status;
    if (status && status !== 200) {
      const key = String(status) as '401' | '403' | '503' | '504';
      const description =
        translate(`errors.${key}` as unknown as any) ||
        translate('errors.unknown');
      confirm({
        title: translate('errors.title'),
        description,
        buttons: {
          ok: { label: translate('common.ok') },
        },
      });
    }
    return Promise.reject(error);
  }
);
