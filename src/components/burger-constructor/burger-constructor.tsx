import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { TConstructorIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { authenticatedSelector } from '../../services/slices/userSlice';
import {
  getConstructorItemsSelector,
  getCurrentOrderSelector,
  getLoadingSelector,
  addOrderBurger,
  cleanCurrentOrder
} from '../../services/slices/ordersSlice';

import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authenticatedSelector);

  const constructorItems = useSelector(getConstructorItemsSelector);
  const orderRequest = useSelector(getLoadingSelector);
  const orderModalData = useSelector(getCurrentOrderSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const allIngredients = [constructorItems.bun].concat(
      constructorItems.ingredients
    );
    allIngredients.push(constructorItems.bun);
    dispatch(addOrderBurger(allIngredients));
  };

  const closeOrderModal = () => {
    dispatch(cleanCurrentOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
