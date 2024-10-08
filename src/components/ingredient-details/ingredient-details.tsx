import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from '../../services/store';
import { getIngredientsSelector } from '../../services/slices/ingredientsSlice';

import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredientsData = useSelector(getIngredientsSelector);
  const ingredientData = ingredientsData.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
