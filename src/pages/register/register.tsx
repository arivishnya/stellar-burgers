import { FC, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import {
  registerUser,
  authenticatedSelector,
  userErrorSelector,
  userRequestSelector
} from '../../services/slices/userSlice';

import { Preloader } from '@ui';
import { RegisterUI } from '@ui-pages';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authenticatedSelector);
  const errorText = useSelector(userErrorSelector);
  const isLoading = useSelector(userRequestSelector);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!userName || !email || !password) {
      return;
    }

    dispatch(
      registerUser({
        name: userName,
        email,
        password
      })
    );
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
