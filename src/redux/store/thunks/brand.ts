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
import { BrandSorts } from 'src/sections/brand/view/brand-view';

export interface IAnalyticsForm extends IRequest {
  name: string;
  balance: number;
  // examples
}

export const fetchAllBrands = createAsyncThunk(
  'brands/fetchAll',
  async ({
    pageNumber,
    pageSize,
    query,
    sort,
  }: {
    pageNumber?: number;
    pageSize?: number;
    query?: string;
    sort?: BrandSorts;
  }) => {
    // custom = "createdAt" user can sort
    // sort = "createdAt" from oldest to newest
    // sort = "-createdAt" from newest to oldest
    let searchParams = '';
    if (pageSize && pageNumber) {
      searchParams = `?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    }
    if (query !== '') {
      searchParams += `&q=${query}`;
    }
    if (sort !== 'custom') {
      searchParams += `&sort=${sort}`;
    }
    const response = await getRequest(`${endpoints.brand.list}${searchParams}`, defaultConfig());

    return response;
  }
);
export const deleteBrand = createAsyncThunk('brands/delete', async (id: any) => {
  const response = await deleteRequest(`${endpoints.brand.search}/${id}`, defaultConfig());
  return response;
});
export const createBrand = createAsyncThunk('brands/create', async (data: any) => {
  let headersObj = defaultConfig();
  headersObj.headers['Content-Type'] = 'multipart/form-data';
  const response = await postRequest(endpoints.brand.search, data, headersObj);
  return response.data;
});

export const fetchOneBrand = createAsyncThunk('brands/fetchOne', async (brandId: number) => {
  const response = await getRequest(`${endpoints.brand.search}/${brandId}`, defaultConfig());

  return response.data;
});

export const editBrand = createAsyncThunk(
  'brands/edit',
  async (payload: { brandId: any; data: any }) => {
    // defaultConfig().headers['Content-Type'] = 'multipart/form-data';
    let headersObj = defaultConfig();
    headersObj.headers['Content-Type'] = 'multipart/form-data';

    const { brandId, data } = payload;
    const response = await putRequest(`${endpoints.brand.search}/${brandId}`, data, headersObj);

    return response.data;
  }
);

export const sortBrand = createAsyncThunk(
  'brand/sortIndex',
  async (payload: { brandId: any; data: any }) => {
    let headersObj = defaultConfig();
    headersObj.headers['Content-Type'] = 'application/json';

    const { brandId, data } = payload;
    const response = await putRequest(`${endpoints.brand.sort}/${brandId}`, data, headersObj);

    return response.data;
  }
);
const initialState = {
  list: [] as any,
  brand: null as any,
  count: 0 as number,
  loading: {
    fetchAllBrands: false,
    deleteBrand: false,
    createBrand: false,
    fetchOneBrand: false,
    editBrand: false,
    sortBrand: false,
  } as {
    fetchAllBrands: boolean;
    deleteBrand: boolean;
    createBrand: boolean;
    fetchOneBrand: boolean;
    editBrand: boolean;
    sortBrand: boolean;
  },
  errors: {
    fetchAllBrands: '',
    deleteBrand: '',
    createBrand: '',
    fetchOneBrand: '',
    editBrand: '',
    sortBrand: '',
  } as {
    fetchAllBrands: string | null;
    deleteBrand: string | null;
    createBrand: string | null;
    fetchOneBrand: string | null;
    editBrand: string | null;
    sortBrand: string | null;
  },
};

const brandsSlice = createSlice({
  name: 'brands',
  initialState: initialState,
  reducers: {
    setBrand: (state, action: PayloadAction<any>) => {
      state.brand = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== fetchAll
      .addCase(resetAllReducers, (state) => {
        state.list = [];
      })
      .addCase(fetchAllBrands.pending, (state) => {
        state.loading.fetchAllBrands = true;
        state.errors.fetchAllBrands = null;
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.loading.fetchAllBrands = false;
        state.errors.fetchAllBrands = null;
        state.list = action.payload.data.data;
        state.count = action.payload.data.count;
      })
      .addCase(fetchAllBrands.rejected, (state, action) => {
        state.loading.fetchAllBrands = false;
        state.errors.fetchAllBrands =
          action.error.message !== undefined ? action.error.message : null;
      })
      // ===== fetchOne
      .addCase(fetchOneBrand.pending, (state) => {
        state.loading.fetchOneBrand = true;
        state.errors.fetchOneBrand = null;
      })
      .addCase(fetchOneBrand.fulfilled, (state, action) => {
        state.loading.fetchOneBrand = false;
        state.errors.fetchOneBrand = null;
        state.brand = action.payload;
      })
      .addCase(fetchOneBrand.rejected, (state, action) => {
        state.loading.fetchOneBrand = false;
        state.errors.fetchOneBrand =
          action.error.message !== undefined ? action.error.message : null;
      })
      // ===== editBrand
      .addCase(editBrand.pending, (state) => {
        state.loading.editBrand = true;
        state.errors.editBrand = null;
      })
      .addCase(editBrand.fulfilled, (state) => {
        state.loading.editBrand = false;
        state.errors.editBrand = null;
      })
      .addCase(editBrand.rejected, (state, action) => {
        state.loading.editBrand = false;
        state.errors.editBrand = action.error.message !== undefined ? action.error.message : null;
      })
      // =====sorBrand
      .addCase(sortBrand.pending, (state) => {
        state.loading.sortBrand = true;
        state.errors.sortBrand = null;
      })
      .addCase(sortBrand.fulfilled, (state) => {
        state.loading.sortBrand = false;
        state.errors.sortBrand = null;
      })
      .addCase(sortBrand.rejected, (state, action) => {
        state.loading.sortBrand = false;
        state.errors.sortBrand = action.error.message !== undefined ? action.error.message : null;
      })
      // ===== deleteBrand
      .addCase(deleteBrand.pending, (state) => {
        state.loading.deleteBrand = true;
        state.errors.deleteBrand = null;
      })
      .addCase(deleteBrand.fulfilled, (state) => {
        state.loading.deleteBrand = false;
        state.errors.deleteBrand = null;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading.deleteBrand = false;
        state.errors.deleteBrand = action.error.message !== undefined ? action.error.message : null;
      })
      // ===== createBrand
      .addCase(createBrand.pending, (state) => {
        state.loading.createBrand = true;
        state.errors.createBrand = null;
      })
      .addCase(createBrand.fulfilled, (state) => {
        state.loading.createBrand = false;
        state.errors.createBrand = null;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading.createBrand = false;
        state.errors.createBrand = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setBrand } = brandsSlice.actions;
export default brandsSlice.reducer;
