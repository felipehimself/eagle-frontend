import { TSignedin } from '@/features/auth/api/post-signin';

export const useUserSession = () => {
  const session = JSON.parse(sessionStorage.getItem('eagle_app') || '{}');

  const clearSession = () => {
    sessionStorage.removeItem('eagle_app');
  };

  const setSession = (session: TSignedin) => {
    sessionStorage.setItem('eagle_app', JSON.stringify(session));
  };

  const getSession = (): TSignedin => session;

  return { clearSession, setSession, getSession };
};
