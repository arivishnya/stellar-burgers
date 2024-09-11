import { Outlet } from 'react-router-dom';

type ProtectedRouteProps = {
  children?: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) =>
  children || <Outlet />;
