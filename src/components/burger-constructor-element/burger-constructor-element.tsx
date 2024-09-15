import { FC, memo } from 'react';

import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  moveDownIngredient,
  moveUpIngredient,
  deleteIngredient
} from '../../services/slices/ordersSlice';

import { BurgerConstructorElementUI } from '@ui';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveDownIngredient(index));
    };

    const handleMoveUp = () => {
      dispatch(moveUpIngredient(index));
    };

    const handleClose = () => {
      dispatch(deleteIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
