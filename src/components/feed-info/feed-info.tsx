import { FC } from 'react';

import { TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { getOrdersDataSelector } from '../../services/slices/ordersSlice';

import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const feed = useSelector(getOrdersDataSelector);
  const orders = feed?.orders || [];

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
