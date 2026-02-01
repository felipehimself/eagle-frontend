import { AppDrawer } from '@/components/drawer/drawer';
import { useUserSession } from '@/hooks/use-user-session';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedLayout = () => {
  const { getSession } = useUserSession();

  const isLoggedIn = getSession()?.accessToken;

  if (!isLoggedIn) return <Navigate to='/auth/signin' />;

  return (
    <AppDrawer>
      <Outlet />
    </AppDrawer>
  );
};
