import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import searchService from '../services/searchService';

export interface ResultItem {
  id?: any;
  cityName: string;
  description: string;
  imageCode: number;
  imagePath: string;
  temperature: number;
  humidity: number;
  precipitation: number;
}

export interface SearchState {
  data: Readonly<ResultItem>;
  cityName: string;
  favoriteCities: ResultItem[];
  error: null | string;
  isLoading: boolean;
  isFetched: boolean;
}

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (cityName: string, thunkApi) => {
    try {
      const response = searchService.getCurrentWeather(cityName);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const initialState: SearchState = {
  data: {} as ResultItem,
  favoriteCities: [],
  cityName: '',
  isLoading: false,
  isFetched: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    fetchDataRequest: (state: SearchState, action: PayloadAction<string>) => {
      state.cityName = action.payload;
      state.isLoading = true;
      state.isFetched = true;
    },
    addFavoriteCity(state, action) {
      state.isLoading = true;
      state.favoriteCities = state.favoriteCities.concat([action.payload]);
      state.isLoading = false;
    },
    removeFavoriteCity(state, action) {
      state.isLoading = true;
      state.favoriteCities = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.data = {} as ResultItem;
      state.isFetched = true;
      state.isLoading = true;
    });
    builder.addCase(
      fetchData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(fetchData.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export const searchActions = searchSlice.actions;
export default searchSlice;
