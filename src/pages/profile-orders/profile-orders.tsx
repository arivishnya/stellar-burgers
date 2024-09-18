import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  getUserOrderSelector
} from '../../services/slices/ordersSlice';

import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orders = useSelector(getUserOrderSelector);

  return <ProfileOrdersUI orders={orders || []} />;
};
