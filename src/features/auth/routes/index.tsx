import { useUserSession } from '@/hooks/use-user-session';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthRoutes = () => {
  const { getSession } = useUserSession();

  const isLoggedIn = getSession()?.accessToken;

  if (isLoggedIn) return <Navigate to='/app/home' />;

  return <Outlet />;
};
