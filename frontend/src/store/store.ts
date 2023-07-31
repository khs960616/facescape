import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import searchReducer from './searchSlice';


export type UserState = {
  token: string | null;
};

export interface SetTokenAction {
  type: 'SET_TOKEN';
  payload: string;
}

export interface ClearTokenAction {
  type: 'CLEAR_TOKEN';
}

export type TokenActionTypes = SetTokenAction | ClearTokenAction;
  
export const setToken = (token: string): TokenActionTypes => ({
  type: 'SET_TOKEN',
  payload: token,
});

export const clearToken = (): ClearTokenAction => ({
  type: 'CLEAR_TOKEN',
})

const initialState: UserState = {
  token: null,
};

// 회원관리
const userReducer = (state = initialState, action: TokenActionTypes) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
      case 'CLEAR_TOKEN':
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

const store = configureStore({
    reducer: {
      // user 회원관리
        user: userReducer,
      // category 상점관리
        setItemType: categoryReducer,
      // keyword 상점관리
        setKeyword: searchReducer,
    },
});

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

export default store;

