import { create } from 'zustand';

type ConfirmDialogButtons = {
  ok?: {
    label?: string;
    onPress?: () => void;
  };
  cancel?: {
    label?: string;
    onPress?: () => void;
  };
};

type ConfirmDialogState = {
  isVisible: boolean;
  title?: string;
  description?: string;
  buttons?: ConfirmDialogButtons;
  show: (params: {
    title?: string;
    description?: string;
    buttons?: ConfirmDialogButtons;
  }) => void;
  hide: () => void;
};

export const useConfirmDialog = create<ConfirmDialogState>((set) => ({
  isVisible: false,
  title: undefined,
  description: undefined,
  buttons: undefined,
  show: ({ title, description, buttons }) =>
    set({ isVisible: true, title, description, buttons }),
  hide: () =>
    set({
      isVisible: false,
      title: undefined,
      description: undefined,
      buttons: undefined,
    }),
}));

export function confirm(params: {
  title?: string;
  description?: string;
  buttons?: ConfirmDialogButtons;
}): void {
  useConfirmDialog.getState().show(params);
}
