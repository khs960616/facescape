import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import searchReducer from './searchSlice';
import persistReducer from './authSlice';
import nickNameReducer from './nickNameSlice';
import userNickNameReducer from './userInfoSlice';
import myItemCategoryReducer from './myItemCategorySlice';
import stageReducer from './stageSlice';

const store = configureStore({
    reducer: {
      // category 상점관리
        setItemType: categoryReducer,
      // keyword 상점관리
        setKeyword: searchReducer,
      // 로그인 여부 관리
        setIsLogIn: persistReducer,
      // 닉네임(비회원)
        nickName: nickNameReducer,
      // 회원 정보
        userNickName: userNickNameReducer,
      // 내가 구매한 아이템 카테고리 관리
        setMyItemType: myItemCategoryReducer,
      // 랭킹 스테이지
        setStage: stageReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false}),

    devTools: process.env.NODE_ENV !== 'production',
});



// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

export default store;

