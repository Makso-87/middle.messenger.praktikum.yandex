import store from '../store/store';
import router from '../router/router';

export const authenticationControl = () => {
  const { user } = store.getState();
  const { pathname } = window.location;
  const allowRoutes = ['/', '/sign-up', '/error-404', '/error-500'];

  if (pathname === '/' && user?.data?.id) {
    router.go('/messenger');
  } else if (!allowRoutes.includes(pathname) && !user?.data?.id) {
    router.go('/');
  }
};
