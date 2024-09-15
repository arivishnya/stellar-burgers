import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import {
  userSelector,
  isAuthCheckedSelector,
  getUser
} from '../../services/slices/userSlice';

import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children?: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(userSelector);

  if (!isAuthChecked) {
    dispatch(getUser());
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children || <Outlet />;
};
