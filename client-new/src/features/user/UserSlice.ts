import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store';
import { User } from '../../interfaces/User';
import UserAPI from '../../api/User';
import { LoginDetails } from '../../interfaces/LoginDetails';
import { SignupDetails } from '../../interfaces/SignupDetails';

interface UserState {
    loggedInUser: User | null;
    // status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null | undefined
}

const initialState: UserState = {
    loggedInUser: null,
    // status: 'idle',
    error: null
}

export const login = createAsyncThunk('user/login', async (loginDetails: LoginDetails) => {
    const response = await UserAPI.login(loginDetails);
    return response;
});

export const signup = createAsyncThunk('user/signup', async (signupDetails: SignupDetails) => {
    const response = await UserAPI.signup(signupDetails);
    return response;
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
          // .addCase(fetchUser.pending, (state) => {
          //   state.status = 'loading';
          // })
          .addCase(login.fulfilled, (state, action) => {
            // state.status = 'succeeded';
            state.loggedInUser = action.payload;
            state.error = null;
          })
          .addCase(login.rejected, (state, action) => {
            // state.status = 'failed';
            state.error = action.error.message;
          })

          .addCase(signup.fulfilled, (state, action) => {
            // state.status = 'succeeded';
            state.loggedInUser = action.payload;
            state.error = null;
          })
          .addCase(signup.rejected, (state, action) => {
            // state.status = 'failed';
            state.error = action.error.message;
          });;
      }
});

// export const { clearSelectedUsers } = UserSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectLoggedInUser = (state: RootState) => state.user.loggedInUser;
export const selectUserError = (state: RootState) => state.user.error;