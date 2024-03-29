import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as moment from 'moment';

const initialState = {
    user: {
        id: 0,
        email: "",
        role: 'guest',
        lastLogin: 0
    }
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        loginUser: (state, action) =>
        {
            state.user = action.payload;
            state.user.lastLogin = moment().valueOf();
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) =>
    {
        
    },
});

export const getUser = (state) => state.user.user;

export const { loginUser } = UserSlice.actions;
export default UserSlice.reducer;
