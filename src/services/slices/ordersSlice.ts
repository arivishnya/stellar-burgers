import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';
import {
  orderBurgerApi,
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi
} from '../../utils/burger-api';
import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TOrdersData
} from '@utils-types';

export const addOrderBurger = createAsyncThunk(
  'orders/orderBurger',
  async (ingredients: TConstructorIngredient[]) =>
    orderBurgerApi(ingredients.map((ingredient) => ingredient._id))
);

export const getFeeds = createAsyncThunk('orders/getFeeds', async () =>
  getFeedsApi()
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (id: number) => getOrderByNumberApi(id)
);

export const getOrders = createAsyncThunk('orders/getOrders', async () =>
  getOrdersApi()
);

const handlePending = (state: TOrdersState) => {
  state.loading = true;
  state.error = null;
  state.orderData = null;
};

const handleRejected = (state: TOrdersState, action: any) => {
  state.loading = false;
  state.error = action.error.message;
};

export type TOrdersState = {
  ordersData: TOrdersData | null;
  orderData: TOrder | null;
  userOrder: TOrder[] | null;
  currentOrder: TOrder | null;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  loading: boolean;
  error: string | null | undefined;
};

export const initialState: TOrdersState = {
  ordersData: null,
  orderData: null,
  userOrder: null,
  currentOrder: null,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  loading: false,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0) {
        const prev = state.constructorItems.ingredients[action.payload + 1];
        state.constructorItems.ingredients[action.payload + 1] =
          state.constructorItems.ingredients[action.payload];
        state.constructorItems.ingredients[action.payload] = prev;
      }
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      if (action.payload > 0) {
        const prev = state.constructorItems.ingredients[action.payload - 1];
        state.constructorItems.ingredients[action.payload - 1] =
          state.constructorItems.ingredients[action.payload];
        state.constructorItems.ingredients[action.payload] = prev;
      }
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0) {
        state.constructorItems.ingredients.splice(action.payload, 1);
      }
    },
    cleanCurrentOrder: (state) => {
      state.loading = false;
      state.currentOrder = null;
    }
  },
  selectors: {
    getOrdersDataSelector: (state) => state.ordersData,
    getUserOrderSelector: (state) => state.userOrder,
    getOrderDataSelector: (state) => state.orderData,
    getConstructorItemsSelector: (state) => state.constructorItems,
    getCurrentOrderSelector: (state) => state.currentOrder,
    getLoadingSelector: (state) => state.loading,
    getErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderBurger.pending, handlePending)
      .addCase(addOrderBurger.rejected, handleRejected)
      .addCase(addOrderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
        state.currentOrder = action.payload.order;
      })

      .addCase(getFeeds.pending, handlePending)
      .addCase(getFeeds.rejected, handleRejected)
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersData = {
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
      })

      .addCase(getOrderByNumber.pending, handlePending)
      .addCase(getOrderByNumber.rejected, handleRejected)
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload.orders[0];
      })

      .addCase(getOrders.pending, handlePending)
      .addCase(getOrders.rejected, handleRejected)
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrder = action.payload;
      });
  }
});

export const {
  addIngredient,
  moveDownIngredient,
  moveUpIngredient,
  deleteIngredient,
  cleanCurrentOrder
} = ordersSlice.actions;
export const {
  getOrdersDataSelector,
  getOrderDataSelector,
  getUserOrderSelector,
  getConstructorItemsSelector,
  getCurrentOrderSelector,
  getLoadingSelector,
  getErrorSelector
} = ordersSlice.selectors;

export default ordersSlice.reducer;
