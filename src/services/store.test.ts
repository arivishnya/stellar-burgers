import { rootReducer } from './store';
import { initialState as ingredientsInitialState } from './slices/ingredientsSlice';
import { initialState as userInitialState } from './slices/userSlice';
import { initialState as ordersInitialState } from './slices/ordersSlice';

describe('rootReducer', () => {
  test('Правильная инициализация rootReducer', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: ingredientsInitialState,
      user: userInitialState,
      orders: ordersInitialState
    });
  });
});
