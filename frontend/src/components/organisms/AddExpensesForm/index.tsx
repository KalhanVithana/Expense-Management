'use client';

import React from 'react';
import DynamicForm from '@/src/components/molecules/Form';
import { FormField } from '@/src/types/formField';
import { useIntl } from 'react-intl';
import Title from '@/src/components/atoms/Title';

const fields: FormField[] = [
  {
    name: 'expenseName',
    label: 'expense.name', 
    type: 'text',
    placeholder: 'expense.namePlaceholder',
    required: true,
  },
  {
    name: 'amount',
    label: 'expense.amount',
    type: 'number',
    placeholder: 'expense.amountPlaceholder',
    required: true,
  },
  {
    name: 'date',
    label: 'expense.date',
    type: 'date',
    placeholder: 'expense.datePlaceholder',
    required: true,
  },
  {
    name: 'category',
    label: 'expense.category',
    type: 'select',
    options: [
      { label: 'expense.category.food', value: 'food' },
      { label: 'expense.category.transport', value: 'transport' },
      { label: 'expense.category.utilities', value: 'utilities' },
      { label: 'expense.category.other', value: 'other' },
    ],
    required: true,
  },
  {
    name: 'notes',
    label: 'expense.notes',
    type: 'textarea',
    placeholder: 'expense.notesPlaceholder',
    required: false,
  },
];

type ExpensesFormProps = {
  onSubmit: (data: Record<string, string>) => void;
   initialValues?: Record<string, string>; 
};

const ExpensesForm: React.FC<ExpensesFormProps> = ({ onSubmit ,initialValues}) => {
  const { formatMessage: t } = useIntl();
  const title = t({ id: 'title.expensesForm' });

  const localizedFields = fields.map((field) => ({
    ...field,
    label: t({ id: field.label }),
    placeholder: field.placeholder ? t({ id: field.placeholder }) : undefined,
    options: field.options
      ? field.options.map((opt) => ({
          label: t({ id: opt.label }),
          value: opt.value,
        }))
      : undefined,
  }));

  return (
    <div className="w-auto mx-auto p-6 max-w-lg bg-white">
      <Title text={title} className="text-2xl font-bold mb-6" />
      <DynamicForm
        fields={localizedFields}
        onSubmit={onSubmit}
        text={title}
        className="w-full !text-md"
        initialValues={initialValues}
      />
    </div>
  );
};

export default ExpensesForm;
