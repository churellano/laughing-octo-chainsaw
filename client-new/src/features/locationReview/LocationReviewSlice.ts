import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store';
import { LocationReview } from '../../interfaces/LocationReview';
import LocationReviewAPI from '../../api/LocationReview';

interface LocationReviewState {
  recentLocationReviews: Array<LocationReview>;
  locationReviews: Array<LocationReview>;
  count: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

const initialState: LocationReviewState = {
  recentLocationReviews: [],
  locationReviews: [],
  count: 0,
  status: 'idle',
  error: null
};

export const fetchRecentLocationReviews = createAsyncThunk('locationReview/fetchRecentLocationReviews', async (locationId: string) => {
    const response = await LocationReviewAPI.getRecent(locationId);
    return response;
});

export const fetchLocationReviewsWithSkip = createAsyncThunk('locationReview/fetchLocationReviewsWithSkip', async ({ locationId, skip, limit }: any) => {
  const response = await LocationReviewAPI.getWithSkip(locationId, skip, limit);
  return response;
});

export const fetchLocationReviewsByUsernameWithSkip = createAsyncThunk('locationReview/fetchLocationReviewsByUsernameWithSkip', async ({ username, skip, limit }: any) => {
  const response = await LocationReviewAPI.getByUsernameWithSkip(username, skip, limit);
  return response;
});

export const submitLocationReview = createAsyncThunk('locationReview/submitLocationReview', async (locationReview: LocationReview) => {
    const response = await LocationReviewAPI.post(locationReview);
    return response;
});

export const locationReviewSlice = createSlice({
    name: 'locationReview',
    initialState,
    reducers: {
        clearSelectedLocationReviews: (state) => {
            state.recentLocationReviews = [];
            state.locationReviews = [];
            state.status = 'idle';
        },
        // resetLocationReviewsStatus: (state) => {
        //     state.status = 'idle';
        // }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchRecentLocationReviews.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.recentLocationReviews = action.payload;
            state.error = null;
          })
          .addCase(fetchRecentLocationReviews.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(fetchLocationReviewsWithSkip.fulfilled, (state, action) => {
            const { locationReviews, count } = action.payload;
            state.status = 'succeeded';
            state.locationReviews = locationReviews;
            state.count = count;
            state.error = null;
          })
          .addCase(fetchLocationReviewsWithSkip.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(fetchLocationReviewsByUsernameWithSkip.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.locationReviews = action.payload.locationReviews;
            state.count = action.payload.count;
            state.error = null;
          })
          .addCase(fetchLocationReviewsByUsernameWithSkip.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(submitLocationReview.fulfilled, (state, action) => {
            // state.status = 'succeeded';
            state.error = null;
          })
          .addCase(submitLocationReview.rejected, (state, action) => {
            // state.status = 'failed';
            state.error = action.error.message;
          });
      }
});

export const { clearSelectedLocationReviews } = locationReviewSlice.actions;

export default locationReviewSlice.reducer;

// Selectors
export const selectRecentLocationReviews = (state: RootState) => state.locationReview.recentLocationReviews;
export const selectLocationReviews = (state: RootState) => state.locationReview.locationReviews;
export const selectLocationReviewsCount = (state: RootState) => state.locationReview.count;
export const selectLocationReviewsStatus = (state: RootState) => state.locationReview.status;
export const selectLocationReviewError =  (state: RootState) => state.locationReview.error;