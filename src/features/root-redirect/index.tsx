import { useUserSession } from '@/hooks/use-user-session';
import { Navigate } from 'react-router-dom';

export const RootRedirect = () => {
  const { getSession } = useUserSession();

  const isLoggedIn = getSession()?.accessToken;

  if (isLoggedIn) {
    return <Navigate to='/app/home' replace />;
  }

  return <Navigate to='/auth/signin' replace />;
};
