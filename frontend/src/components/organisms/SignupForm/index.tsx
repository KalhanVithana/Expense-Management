
'use client';

import React from 'react';
import DynamicForm from '@/src/components/molecules/Form';
import { FormField } from '@/src/types/formField';
import { useIntl } from 'react-intl';
import Title from '@/src/components/atoms/Title';
import { User } from '@/src/services/userService';

const fields: FormField[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'Enter your username',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
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

type SignUpFormProps = {
  onSubmit: (data: User) => void | Promise<void>;
};
 const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  
    const {formatMessage} = useIntl()
    const signUpTitle =formatMessage({id:'title.signUp'})

  return (
    <div className="w-auto mx-auto p-6">
        <Title key={1} text={signUpTitle}  className="text-2xl font-bold mb-4" />
      <DynamicForm fields={fields} onSubmit={onSubmit}  text={signUpTitle} className='w-full !text-md'/>
    <p className="mt-4 text-center text-gray-600 text-sm">
  {formatMessage({ id: 'signup.needLoginMessage' })} <a href="/login" className="text-blue-600 underline">Login</a>
</p>
    </div>
  );
}

export default SignUpForm;