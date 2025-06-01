
'use client';

import { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import en from '@/src/locales/en/common.json';
const messages: Record<string, Record<string, string>> = {
  en,

};

type Props = {
  children: ReactNode;
  locale: string;
};

export default function ReactIntlProvider({ children, locale }: Props) {
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
}
