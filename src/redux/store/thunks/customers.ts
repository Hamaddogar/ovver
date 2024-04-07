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

export interface ICustomerForm extends IRequest {
  name: string;
  balance: number;
  // examples
}
export const fetchCustomersList = createAsyncThunk(
  'customers/all',
  async (paramsData: any = null) => {
    try {
      const { query, type, pageNumber, pageSize } = paramsData;
      // search params
      let searchParams = `?pageSize=${pageSize}&pageNumber=${pageNumber}`;
      if (query !== '') {
        searchParams += `&q=${query}`;
      }
      if (type !== 'All') {
        searchParams += `&type=${type}`;
      }
      // console.log('paramsData: ', paramsData);
      // console.log('customers api: ', `${endpoints.customer.list}${searchParams}`);

      const response = await getRequest(
        `${endpoints.customer.list}${searchParams}`,
        defaultConfig()
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchOneCustomer = createAsyncThunk('customers/one', async (customerId: any) => {
  const response = await getRequest(`${endpoints.customer.root}/${customerId}`, defaultConfig());
  return response.data || {};
});

export const createCustomer = createAsyncThunk('customers/create', async (data: ICustomerForm) => {
  let headersObj = defaultConfig();
  headersObj.headers['Content-Type'] = 'multipart/form-data';
  const response = await postRequest(endpoints.customer.root, data, headersObj);

  return response.data;
});

export const editCustomer = createAsyncThunk(
  'customers/edit',
  async (payload: { customerId: any; data: ICustomerForm }) => {
    let headersObj = defaultConfig();
    headersObj.headers['Content-Type'] = 'multipart/form-data';
    const { customerId, data } = payload;
    const response = await putRequest(`${endpoints.customer.root}/${customerId}`, data, headersObj);

    return response.data;
  }
);

export const deleteCustomer = createAsyncThunk('customers/delete', async (customerId: any) => {
  const response = await deleteRequest(`${endpoints.customer.root}/${customerId}`, defaultConfig());

  return response.data;
});

const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    list: [],
    count: 0,
    customer: null as any,
    loading: {
      fetchOneCustomer: false,
      fetchCustomersList: false,
      createCustomer: false,
      deleteCustomer: false,
      editCustomer: false,
    },
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setCustomers: (state, action: PayloadAction<any>) => {
      state.customer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAllReducers, (state) => {
        // Reset the state for the customers reducer
        state.status = 'idle';
        state.list = []; // Replace with your initial state
      })

      .addCase(fetchCustomersList.pending, (state) => {
        state.loading.fetchCustomersList = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchCustomersList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading.fetchCustomersList = false;
        state.list = action.payload.data;
        state.count = action.payload.count;
      })
      .addCase(fetchCustomersList.rejected, (state, action) => {
        state.status = 'failed';
        state.loading.fetchCustomersList = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneCustomer.pending, (state) => {
        state.loading.fetchOneCustomer = true;
        state.error = null;
      })
      .addCase(fetchOneCustomer.fulfilled, (state, action) => {
        state.loading.fetchOneCustomer = false;
        state.customer = action.payload;
      })
      .addCase(fetchOneCustomer.rejected, (state, action) => {
        state.loading.fetchOneCustomer = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(createCustomer.pending, (state) => {
        state.loading.createCustomer = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state) => {
        state.loading.createCustomer = false;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading.createCustomer = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editCustomer.pending, (state) => {
        state.loading.editCustomer = true;
        state.error = null;
      })
      .addCase(editCustomer.fulfilled, (state) => {
        state.loading.editCustomer = false;
      })
      .addCase(editCustomer.rejected, (state, action) => {
        state.loading.editCustomer = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteCustomer.pending, (state) => {
        state.loading.deleteCustomer = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state) => {
        state.loading.deleteCustomer = false;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading.deleteCustomer = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setCustomers } = customersSlice.actions;
export default customersSlice.reducer;
