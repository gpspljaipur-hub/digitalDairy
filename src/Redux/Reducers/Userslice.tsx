import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    _id: number;
    token: string;
    mobile: any;
    number_verified: any
    amount: any

}

export interface UserState {
    user: User | null;
    teacher: User | null;
    parent: User | null;
    isAuthenticated: boolean;
    hasFinishedOnboarding: boolean;
    userType: string | null;
}

const initialState: UserState = {
    user: null,
    teacher: null,
    parent: null,
    isAuthenticated: false,
    hasFinishedOnboarding: false,
    userType: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginParentSuccess: (state, action: PayloadAction<User>) => {
            state.parent = action.payload;
            state.isAuthenticated = true;
        },
        loginTeacherSuccess: (state, action: PayloadAction<User>) => {
            state.teacher = action.payload;
            state.isAuthenticated = true;
        },
        logout: state => {
            state.teacher = null;
            state.parent = null;
            state.user = null;
            state.isAuthenticated = false;
        },
        setOnboardingFinished: (state, action: PayloadAction<boolean>) => {
            state.hasFinishedOnboarding = action.payload;
        },
        setUserType: (state, action: PayloadAction<string>) => {
            state.userType = action.payload;
        },
    },
});

export const { loginParentSuccess, loginTeacherSuccess, logout, setOnboardingFinished, setUserType } = userSlice.actions;
export default userSlice.reducer;
