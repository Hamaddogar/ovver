import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { resetAllReducers } from './resetSlice';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
  IRequest,
} from 'src/utils/axios';

export interface IAnalyticsForm extends IRequest {
  name: string;
  balance: number;
  // examples
}

export const fetchMyUser = createAsyncThunk('users/me', async () => {
  const response = await getRequest(`${endpoints.users.me}`, defaultConfig());

  return response.data;
});

export const editMyUser = createAsyncThunk('users', async (payload: { data: any }) => {
  let headersObj = defaultConfig();
  headersObj.headers['Content-Type'] = 'multipart/form-data';

  const { data } = payload;
  const response = await putRequest(`${endpoints.users.root}`, data, headersObj);

  return response.data;
});

export const editPassword = createAsyncThunk(
  'users/reset_password',
  async (payload: { data: any }) => {
    let headersObj = defaultConfig();
    headersObj.headers['Content-Type'] = 'application/json';

    const { data } = payload;
    const response = await putRequest(`${endpoints.users.resetPassword}`, data, headersObj);

    return response.data;
  }
);

export const deleteUser = createAsyncThunk('users/delete_account', async () => {
  const response = await deleteRequest(`${endpoints.users.deleteAccount}`, defaultConfig());
  return response;
});

const initialState = {
  user: null as any,
  count: 0 as number,
  loading: {
    deleteUser: false,
    fetchMyUser: false,
    editMyUser: false,
    editPassword: false,
  } as {
    deleteUser: boolean;
    fetchMyUser: boolean;
    editMyUser: boolean;
    editPassword: boolean;
  },
  errors: {
    deleteUser: '',
    fetchMyUser: '',
    editMyUser: '',
    editPassword: '',
  } as {
    deleteUser: string | null;
    fetchMyUser: string | null;
    editMyUser: string | null;
    editPassword: string | null;
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== fetchMyUser
      .addCase(fetchMyUser.pending, (state) => {
        state.loading.fetchMyUser = true;
        state.errors.fetchMyUser = null;
      })
      .addCase(fetchMyUser.fulfilled, (state, action) => {
        state.loading.fetchMyUser = false;
        state.errors.fetchMyUser = null;
        state.user = action.payload;
      })
      .addCase(fetchMyUser.rejected, (state, action) => {
        state.loading.fetchMyUser = false;
        state.errors.fetchMyUser = action.error.message !== undefined ? action.error.message : null;
      })
      // ===== editMyUser
      .addCase(editMyUser.pending, (state) => {
        state.loading.editMyUser = true;
        state.errors.editMyUser = null;
      })
      .addCase(editMyUser.fulfilled, (state) => {
        state.loading.editMyUser = false;
        state.errors.editMyUser = null;
      })
      .addCase(editMyUser.rejected, (state, action) => {
        state.loading.editMyUser = false;
        state.errors.editMyUser = action.error.message !== undefined ? action.error.message : null;
      })
      // ===== editPassword
      .addCase(editPassword.pending, (state) => {
        state.loading.editPassword = true;
        state.errors.editPassword = null;
      })
      .addCase(editPassword.fulfilled, (state) => {
        state.loading.editPassword = false;
        state.errors.editPassword = null;
      })
      .addCase(editPassword.rejected, (state, action) => {
        state.loading.editPassword = false;
        state.errors.editPassword =
          action.error.message !== undefined ? action.error.message : null;
      })
      // ===== deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.loading.deleteUser = true;
        state.errors.deleteUser = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading.deleteUser = false;
        state.errors.deleteUser = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading.deleteUser = false;
        state.errors.deleteUser = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
