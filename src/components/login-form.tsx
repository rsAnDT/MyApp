import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/components/ui';
import { translate } from '@/lib';

export type FormType = {
  name?: string;
  email: string;
  password: string;
};

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const schema = React.useMemo(
    () =>
      z.object({
        name: z.string().optional(),
        email: z
          .string({ required_error: translate('validation.email_required') })
          .email(translate('validation.email_invalid')),
        password: z
          .string({ required_error: translate('validation.password_required') })
          .min(6, translate('validation.password_min')),
      }),
    []
  );

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        <View className="items-center justify-center">
          <Text
            testID="form-title"
            className="pb-6 text-center text-4xl font-bold"
          >
            {translate('login.title')}
          </Text>

          <Text className="mb-6 max-w-xs text-center text-gray-500">
            {translate('login.subtitle')}
          </Text>
        </View>

        <ControlledInput
          testID="name"
          control={control}
          name="name"
          label={translate('login.fields.name')}
        />

        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label={translate('login.fields.email')}
        />
        <ControlledInput
          testID="password-input"
          control={control}
          name="password"
          label={translate('login.fields.password')}
          placeholder="***"
          secureTextEntry={true}
        />
        <Button
          testID="login-button"
          label={translate('login.submit')}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
