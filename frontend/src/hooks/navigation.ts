'use client';

import { useRouter } from 'next/navigation';

export function useNavigation() {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const replaceWith = (path: string) => {
    router.replace(path);
  };

  const refreshPage = () => {
    router.refresh();
  };

  return {
    navigateTo,
    replaceWith,
    refreshPage,
  };
}
