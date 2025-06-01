'use client';

import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { FormField } from '@/src/types/formField';

type Props<T> = {
  fields: FormField[];
  onSubmit: (data: T) => void | Promise<void>;
  text: string;
  className?: string;
  initialValues?: Partial<T>; 
};

const { TextArea } = Input;

function DynamicForm<T>({ fields, onSubmit, text, className, initialValues }: Props<T>) {
  const [form] = Form.useForm();

  const handleFinish = (values: T) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={initialValues} 
      className="space-y-4"
    >
      {fields.map((field) => {
        let inputElement: React.ReactNode;

        switch (field.type) {
          case 'textarea':
            inputElement = <TextArea placeholder={field.placeholder} rows={4} />;
            break;

          case 'select':
            inputElement = (
              <Select placeholder={field.placeholder}>
                {field.options?.map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select>
            );
            break;

          case 'date':
            inputElement = <Input type="date" placeholder={field.placeholder} />;
            break;

          default:
            inputElement = <Input type={field.type} placeholder={field.placeholder} />;
        }

        return (
          <Form.Item
            key={field.name}
            label={field.label}
            name={field.name}
            rules={[{ required: field.required, message: `${field.label} is required` }]}
          >
            {inputElement}
          </Form.Item>
        );
      })}

      <Form.Item>
        <Button type="primary" htmlType="submit" className={className}>
          {text}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default DynamicForm;
