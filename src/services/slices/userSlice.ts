import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  TLoginData,
  registerUserApi,
  TRegisterData,
  logoutApi,
  updateUserApi,
  getUserApi
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser } from '../../utils/types';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ name, email, password }: TRegisterData) => {
    const data = await registerUserApi({ name, email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ name, email, password }: TRegisterData) => {
    const data = await updateUserApi({ name, email, password });
    return data.user;
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const data = await getUserApi();
  return data.user;
});

export type TUserState = {
  user: TUser | undefined;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  userError: string | undefined;
  userRequest: boolean;
};

export const initialState: TUserState = {
  user: undefined,
  isAuthChecked: false,
  isAuthenticated: false,
  userError: undefined,
  userRequest: false
};

const handlePending = (state: TUserState) => {
  state.userRequest = true;
  state.userError = undefined;
};

const handleRejected = (state: TUserState, action: any) => {
  state.userRequest = false;
  state.userError = action.error.message;
  state.isAuthChecked = true;
};

const handleFulfilled = (state: TUserState, action: any) => {
  state.user = action.payload;
  state.userRequest = false;
  state.isAuthenticated = true;
  state.isAuthChecked = true;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    userSelector: (state) => state.user,
    authenticatedSelector: (state) => state.isAuthenticated,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    userErrorSelector: (state) => state.userError,
    userRequestSelector: (state) => state.userRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(loginUser.fulfilled, handleFulfilled)

      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(registerUser.fulfilled, handleFulfilled)

      .addCase(logout.pending, handlePending)
      .addCase(logout.rejected, handleRejected)
      .addCase(logout.fulfilled, (state) => {
        state.user = undefined;
        state.userRequest = false;
        state.isAuthenticated = false;
        state.isAuthChecked = false;
      })

      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.rejected, handleRejected)
      .addCase(updateUser.fulfilled, handleFulfilled)

      .addCase(getUser.pending, handlePending)
      .addCase(getUser.rejected, handleRejected)
      .addCase(getUser.fulfilled, handleFulfilled);
  }
});

export const {
  userSelector,
  isAuthCheckedSelector,
  authenticatedSelector,
  userErrorSelector,
  userRequestSelector
} = userSlice.selectors;
export default userSlice.reducer;
