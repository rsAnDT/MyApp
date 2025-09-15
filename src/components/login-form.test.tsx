import React from 'react';

import { translate } from '@/lib';
import { cleanup, screen, setup, waitFor } from '@/lib/test-utils';

import type { LoginFormProps } from './login-form';
import { LoginForm } from './login-form';

afterEach(cleanup);

const onSubmitMock: jest.Mock<LoginFormProps['onSubmit']> = jest.fn();

describe('LoginForm Form ', () => {
  it('renders correctly', async () => {
    setup(<LoginForm />);
    expect(await screen.findByTestId('form-title')).toBeOnTheScreen();
  });

  it('should display required error when values are empty', async () => {
    const { user } = setup(<LoginForm />);

    const button = screen.getByTestId('login-button');
    expect(
      screen.queryByText(translate('validation.email_required'))
    ).not.toBeOnTheScreen();
    await user.press(button);
    expect(
      await screen.findByText(translate('validation.email_required'))
    ).toBeOnTheScreen();
    expect(
      screen.getByText(translate('validation.email_required'))
    ).toBeOnTheScreen();
  });

  it('should display matching error when email is invalid', async () => {
    const { user } = setup(<LoginForm />);

    const button = screen.getByTestId('login-button');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    await user.type(emailInput, 'yyyyy');
    await user.type(passwordInput, 'test');
    await user.press(button);

    expect(
      await screen.findByText(translate('validation.email_invalid'))
    ).toBeOnTheScreen();
    expect(
      screen.queryByText(translate('validation.email_required'))
    ).not.toBeOnTheScreen();
  });

  it('Should call LoginForm with correct values when values are valid', async () => {
    const { user } = setup(<LoginForm onSubmit={onSubmitMock} />);

    const button = screen.getByTestId('login-button');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    await user.type(emailInput, 'youssef@gmail.com');
    await user.type(passwordInput, 'password');
    await user.press(button);
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });
    // expect.objectContaining({}) because we don't want to test the target event we are receiving from the onSubmit function
    expect(onSubmitMock).toHaveBeenCalledWith(
      {
        email: 'youssef@gmail.com',
        password: 'password',
      },
      expect.objectContaining({})
    );
  });
});
