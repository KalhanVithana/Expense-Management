export type FieldType = 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' |'date';

export type FormField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[]; 
};
