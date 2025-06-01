import React from 'react';
import { Input as AntInput } from 'antd';
import type { InputProps as AntInputProps } from 'antd';

export type InputProps = AntInputProps & {
  label?: string;
};

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <AntInput {...props} className="!rounded-md !border-gray-300" />
    </div>
  );
};

export default Input;
