import { FC, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import {
  loginUser,
  authenticatedSelector,
  userErrorSelector,
  userRequestSelector
} from '../../services/slices/userSlice';

import { Preloader } from '@ui';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authenticatedSelector);
  const errorText = useSelector(userErrorSelector);
  const isLoading = useSelector(userRequestSelector);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    dispatch(
      loginUser({
        email,
        password
      })
    );
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
