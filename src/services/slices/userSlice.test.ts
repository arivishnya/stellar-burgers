import userReducer, {
  TUserState,
  initialState,
  loginUser,
  registerUser,
  logout,
  updateUser,
  getUser
} from './userSlice';

describe('userSlice extraReducers', () => {
  let state: TUserState;

  const loginData = {
    email: '',
    password: ''
  };

  const userData = {
    email: 'arivishnya96@gmail.com',
    name: 'Arina'
  };

  const registerData = {
    email: '',
    password: '',
    name: ''
  };

  beforeEach(() => {
    state = { ...initialState };
  });

  test('[loginUser] обработка pending', () => {
    const newState = userReducer(
      state,
      loginUser.pending('user/loginUser', loginData)
    );
    expect(newState.userRequest).toBe(true);
    expect(newState.userError).toBe(undefined);
  });

  test('[loginUser] обработка rejected', () => {
    const error = new Error('Failed to loginUser');

    const newState = userReducer(
      state,
      loginUser.rejected(error, 'user/loginUser', loginData)
    );
    expect(newState.userRequest).toBe(false);
    expect(newState.userError).toBe(error.message);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('[loginUser] обработка fulfilled', () => {
    const newState = userReducer(
      state,
      loginUser.fulfilled(userData, 'user/loginUser', loginData)
    );
    expect(newState.user).toEqual(userData);
    expect(newState.userRequest).toBe(false);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
  });
  

  test('[registerUser] обработка pending', () => {
    const newState = userReducer(
      state,
      registerUser.pending('user/registerUser', registerData)
    );
    expect(newState.userRequest).toBe(true);
    expect(newState.userError).toBe(undefined);
  });

  test('[registerUser] обработка rejected', () => {
    const error = new Error('Failed to registerUser');

    const newState = userReducer(
      state,
      registerUser.rejected(error, 'user/registerUser', registerData)
    );
    expect(newState.userRequest).toBe(false);
    expect(newState.userError).toBe(error.message);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('[registerUser] обработка fulfilled', () => {
    const newState = userReducer(
      state,
      registerUser.fulfilled(userData, 'user/registerUser', registerData)
    );
    expect(newState.user).toEqual(userData);
    expect(newState.userRequest).toBe(false);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
  });


  test('[logout] обработка pending', () => {
    const newState = userReducer(state, logout.pending('user/logout'));
    expect(newState.userRequest).toBe(true);
    expect(newState.userError).toBe(undefined);
  });

  test('[logout] обработка rejected', () => {
    const error = new Error('Failed to logout');

    const newState = userReducer(state, logout.rejected(error, 'user/logout'));
    expect(newState.userRequest).toBe(false);
    expect(newState.userError).toBe(error.message);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('[logout] обработка fulfilled', () => {
    const newState = userReducer(
      state,
      logout.fulfilled(undefined, 'user/logout')
    );
    expect(newState.user).toEqual(undefined);
    expect(newState.userRequest).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.isAuthChecked).toBe(false);
  });


  test('[updateUser] обработка pending', () => {
    const newState = userReducer(
      state,
      updateUser.pending('user/updateUser', registerData)
    );
    expect(newState.userRequest).toBe(true);
    expect(newState.userError).toBe(undefined);
  });

  test('[updateUser] обработка rejected', () => {
    const error = new Error('Failed to updateUser');

    const newState = userReducer(
      state,
      updateUser.rejected(error, 'user/updateUser', registerData)
    );
    expect(newState.userRequest).toBe(false);
    expect(newState.userError).toBe(error.message);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('[updateUser] обработка fulfilled', () => {
    const newState = userReducer(
      state,
      updateUser.fulfilled(userData, 'user/updateUser', registerData)
    );
    expect(newState.user).toEqual(userData);
    expect(newState.userRequest).toBe(false);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
  });


  test('[getUser] обработка pending', () => {
    const newState = userReducer(state, getUser.pending('user/getUser'));
    expect(newState.userRequest).toBe(true);
    expect(newState.userError).toBe(undefined);
  });

  test('[getUser] обработка rejected', () => {
    const error = new Error('Failed to getUser');

    const newState = userReducer(
      state,
      getUser.rejected(error, 'user/getUser')
    );
    expect(newState.userRequest).toBe(false);
    expect(newState.userError).toBe(error.message);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('[getUser] обработка fulfilled', () => {
    const newState = userReducer(
      state,
      getUser.fulfilled(userData, 'user/getUser')
    );
    expect(newState.user).toEqual(userData);
    expect(newState.userRequest).toBe(false);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
  });
});
