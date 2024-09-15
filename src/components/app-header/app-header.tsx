import { FC } from 'react';
import { TAppHeaderUIProps } from '../ui/app-header/type';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC<TAppHeaderUIProps> = ({ userName }) => (
  <AppHeaderUI userName={userName} />
);
