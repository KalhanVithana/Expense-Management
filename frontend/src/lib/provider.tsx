'use client';

import { Provider } from 'react-redux';
import { store } from '@/src/lib/store';

export function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
