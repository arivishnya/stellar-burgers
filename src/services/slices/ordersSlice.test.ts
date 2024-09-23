import ordersReducer, {
  TOrdersState,
  initialState,
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient,
  cleanCurrentOrder,
  addOrderBurger,
  getFeeds,
  getOrderByNumber,
  getOrders
} from './ordersSlice';

describe('ordersSlice reducers', () => {
  let state: TOrdersState;

  beforeEach(() => {
    state = { ...initialState };
  });

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

  const ingredient2 = {
    _id: '2',
    name: 'Sauce',
    type: 'sauce',
    proteins: 10,
    fat: 5,
    carbohydrates: 30,
    calories: 100,
    price: 10,
    image: '',
    image_large: '',
    image_mobile: '',
    id: '2'
  };

  test('[addIngredient] обработка экшена добавления ингредиента', () => {
    const newState = ordersReducer(state, addIngredient(ingredient1));
    expect(newState.constructorItems.bun).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
  });

  test('[deleteIngredient] обработка экшена удаления ингредиента', () => {
    state = {
      ...state,
      constructorItems: {
        ...state.constructorItems,
        ingredients: [ingredient1, ingredient2]
      }
    };

    const newState = ordersReducer(state, deleteIngredient(0));
    expect(newState.constructorItems.ingredients).toEqual([ingredient2]);
  });

  test('[moveUpIngredient] обработка экшена изменения порядка ингредиентов в начинке', () => {
    state = {
      ...state,
      constructorItems: {
        ...state.constructorItems,
        ingredients: [ingredient1, ingredient2]
      }
    };

    const newState = ordersReducer(state, moveUpIngredient(1));
    expect(newState.constructorItems.ingredients).toEqual([
      ingredient2,
      ingredient1
    ]);
  });

  test('[moveDownIngredient] обработка экшена изменения порядка ингредиентов в начинке', () => {
    state = {
      ...state,
      constructorItems: {
        ...state.constructorItems,
        ingredients: [ingredient1, ingredient2]
      }
    };

    const newState = ordersReducer(state, moveDownIngredient(0));
    expect(newState.constructorItems.ingredients).toEqual([
      ingredient2,
      ingredient1
    ]);
  });

  test('[cleanCurrentOrder] обработка экшена очищения заказа', () => {
    state = {
      ...state,
      currentOrder: {
        _id: '1',
        status: '',
        name: 'Order',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: [ingredient1._id, ingredient2.id]
      }
    };

    const newState = ordersReducer(state, cleanCurrentOrder());
    expect(newState.currentOrder).toBe(null);
  });
});

describe('ordersSlice extraReducers', () => {
  let state: TOrdersState;

  const order = {
    _id: '',
    status: '',
    name: 'Order',
    createdAt: '',
    updatedAt: '',
    number: 1,
    ingredients: ['']
  };

  beforeEach(() => {
    state = { ...initialState };
  });

  test('[addOrderBurger] обработка pending', () => {
    const newState = ordersReducer(
      state,
      addOrderBurger.pending('orders/orderBurger', [])
    );
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
    expect(newState.orderData).toBe(null);
  });

  test('[addOrderBurger] обработка rejected', () => {
    const error = new Error('Failed to addOrderBurger');

    const newState = ordersReducer(
      state,
      addOrderBurger.rejected(error, 'orders/orderBurger', [])
    );
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error.message);
  });

  test('[addOrderBurger] обработка fulfilled', () => {
    const orderData = {
      name: '',
      success: true,
      order
    };

    const newState = ordersReducer(
      state,
      addOrderBurger.fulfilled(orderData, 'orders/orderBurger', [])
    );
    expect(newState.loading).toBe(false);
    expect(newState.currentOrder).toEqual(orderData.order);
    expect(newState.constructorItems).toEqual({
      bun: null,
      ingredients: []
    });
  });
  

  test('[getFeeds] обработка pending', () => {
    const newState = ordersReducer(state, getFeeds.pending('orders/getFeeds'));
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
    expect(newState.orderData).toBe(null);
  });

  test('[getFeeds] обработка rejected', () => {
    const error = new Error('Failed to getFeeds');

    const newState = ordersReducer(
      state,
      getFeeds.rejected(error, 'orders/getFeeds')
    );
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error.message);
  });

  test('[getFeeds] обработка fulfilled', () => {
    const feedsData = {
      success: true,
      orders: [order],
      total: 1,
      totalToday: 1
    };

    const newState = ordersReducer(
      state,
      getFeeds.fulfilled(feedsData, 'orders/getFeeds')
    );
    expect(newState.loading).toBe(false);
    expect(newState.ordersData).toEqual({ ...feedsData, success: undefined });
  });


  test('[getOrderByNumber] обработка pending', () => {
    const newState = ordersReducer(
      state,
      getOrderByNumber.pending('orders/getOrderByNumber', 1)
    );
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
    expect(newState.orderData).toBe(null);
  });

  test('[getOrderByNumber] обработка rejected', () => {
    const error = new Error('Failed to getOrderByNumber');

    const newState = ordersReducer(
      state,
      getOrderByNumber.rejected(error, 'orders/getOrderByNumber', 1)
    );
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error.message);
  });

  test('[getOrderByNumber] обработка fulfilled', () => {
    const orderData = {
      success: true,
      orders: [order],
      total: 1,
      totalToday: 1
    };

    const newState = ordersReducer(
      state,
      getOrderByNumber.fulfilled(orderData, 'orders/getOrderByNumber', 1)
    );
    expect(newState.loading).toBe(false);
    expect(newState.orderData).toEqual({
      ...orderData.orders[0],
      success: undefined
    });
  });


  test('[getOrders] обработка pending', () => {
    const newState = ordersReducer(
      state,
      getOrders.pending('orders/getOrders')
    );
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
    expect(newState.orderData).toBe(null);
  });

  test('[getOrders] обработка rejected', () => {
    const error = new Error('Failed to getOrderByNumber');

    const newState = ordersReducer(
      state,
      getOrders.rejected(error, 'orders/getOrders')
    );
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error.message);
  });

  test('[getOrders] обработка fulfilled', () => {
    const newState = ordersReducer(
      state,
      getOrders.fulfilled([order], 'orders/getOrders')
    );
    expect(newState.loading).toBe(false);
    expect(newState.userOrder).toEqual([order]);
  });
});
