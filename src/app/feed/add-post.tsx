import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { Stack, useRouter } from 'expo-router';
import * as React from 'react';
import type { Control } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAddPost } from '@/api';
import {
  Button,
  ControlledInput,
  ResponsiveContainer,
  View,
} from '@/components/ui';
import { confirm, getWebScreenOptions, translate } from '@/lib';

const schema = z.object({
  title: z.string().min(10),
  body: z.string().min(120),
});

type FormType = z.infer<typeof schema>;

type AddPostFormProps = {
  control: Control<FormType>;
  isPending: boolean;
  onSubmit: () => void;
};

function getErrorMessage(error: AxiosError): string {
  const data = error.response?.data as { message?: string } | undefined;
  return data?.message || error.message || translate('post.add_error_message');
}

function AddPostForm({ control, isPending, onSubmit }: AddPostFormProps) {
  return (
    <View className="flex-1 p-4 ">
      <ControlledInput
        name="title"
        label={translate('post.title_field')}
        control={control}
        testID="title"
      />
      <ControlledInput
        name="body"
        label={translate('post.content')}
        control={control}
        multiline
        testID="body-input"
      />
      <Button
        label={translate('post.add_button')}
        loading={isPending}
        onPress={onSubmit}
        testID="add-post-button"
      />
    </View>
  );
}

export default function AddPost() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { mutate: addPost, isPending } = useAddPost();

  const handleSuccess = React.useCallback(() => {
    confirm({
      title: translate('post.add_success_title'),
      description: translate('post.add_success_message'),
      buttons: {
        ok: {
          label: translate('common.ok'),
          onPress: () => router.back(),
        },
      },
    });
  }, [router]);

  const handleError = React.useCallback((error: AxiosError) => {
    confirm({
      title: translate('errors.title'),
      description: getErrorMessage(error),
      buttons: { ok: { label: translate('common.ok') } },
    });
  }, []);

  const onSubmit = React.useCallback(
    (data: FormType) => {
      addPost(
        { ...data, userId: 1 },
        { onSuccess: handleSuccess, onError: handleError }
      );
    },
    [addPost, handleSuccess, handleError]
  );

  return (
    <ResponsiveContainer maxWidth="2xl" className="flex-1">
      <Stack.Screen
        options={getWebScreenOptions({
          title: translate('post.add'),
          headerBackTitle: translate('post.back'),
        })}
      />
      <AddPostForm
        control={control}
        isPending={isPending}
        onSubmit={handleSubmit(onSubmit)}
      />
    </ResponsiveContainer>
  );
}
