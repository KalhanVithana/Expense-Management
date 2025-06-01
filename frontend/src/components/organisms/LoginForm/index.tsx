'use client';

import React from 'react';
import DynamicForm from '@/src/components/molecules/Form';
import { FormField } from '@/src/types/formField';
import { useIntl } from 'react-intl';
import Title from '@/src/components/atoms/Title';

const fields: FormField[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'Enter your username',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
];

type LoginFormProps = {
  onSubmit: (data: Record<string, string>) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { formatMessage } = useIntl();
  const loginText = formatMessage({ id: 'title.login' });

  return (
    <div className="w-auto mx-auto p-6">
      <Title key={1} text={loginText} className="text-2xl font-bold mb-4" />
      <DynamicForm
        fields={fields}
        onSubmit={onSubmit}
        text={loginText}
        className="w-full !text-md"
      />
      <p className="mt-4 text-center text-gray-600 text-sm">
        {formatMessage({ id: 'signup.needLoginMessage' })}{' '}
        <a href="/signup" className="text-blue-600 underline">
          {formatMessage({ id: 'title.signUp' })}
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
