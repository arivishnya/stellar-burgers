import { FC, useEffect } from 'react';

import { useSelector, useDispatch } from '../../services/store';
import {
  getOrdersDataSelector,
  getLoadingSelector,
  getFeeds
} from '../../services/slices/ordersSlice';

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const ordersData = useSelector(getOrdersDataSelector);
  const orders = ordersData?.orders || [];
  const isLoading = useSelector(getLoadingSelector);

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
