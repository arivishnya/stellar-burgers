import ingredientsReducer, {
  TIngredientsState,
  initialState,
  getIngredients
} from './ingredientsSlice';

describe('ingredientsSlice extraReducers', () => {
  let state: TIngredientsState;

  const ingredient1 = {
    _id: '1',
    name: 'Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 30,
    calories: 100,
    price: 50,
    image: '',
    image_large: '',
    image_mobile: '',
    id: '1'
  };

  beforeEach(() => {
    state = { ...initialState };
  });

  test('[getIngredients] обработка pending', () => {
    const newState = ingredientsReducer(
      state,
      getIngredients.pending('ingredients/getIngredients')
    );
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('[getIngredients] обработка rejected', () => {
    const error = new Error('Failed to getIngredients');

    const newState = ingredientsReducer(
      state,
      getIngredients.rejected(error, 'ingredients/getIngredients')
    );
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error.message);
  });

  test('[getIngredients] обработка fulfilled', () => {
    const ingredientsData = {
      success: true,
      data: [ingredient1]
    };

    const newState = ingredientsReducer(
      state,
      getIngredients.fulfilled([ingredient1], 'ingredients/getIngredients')
    );
    expect(newState.loading).toBe(false);
    expect(newState.ingredients).toEqual(ingredientsData.data);
  });
});
