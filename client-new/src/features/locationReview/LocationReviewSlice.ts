import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store';
import { ILocationReview } from '../../interfaces/ILocationReview';
import LocationReviewAPI from '../../api/LocationReview';

interface LocationReviewState {
    selectedLocationReviews: Array<ILocationReview>;
    // status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null | undefined
}

const initialState: LocationReviewState = {
    selectedLocationReviews: [],
    // status: 'idle',
    error: null
}

export const fetchLocationReviews = createAsyncThunk('locationReview/fetchLocationReviews', async (locationId: string) => {
    const response = await LocationReviewAPI.get(locationId);
    return response;
});

export const locationReviewSlice = createSlice({
    name: 'locationReview',
    initialState,
    reducers: {
        clearSelectedLocationReviews: (state) => {
            state.selectedLocationReviews = [];
        }
    },
    extraReducers: (builder) => {
        builder
          // .addCase(fetchLocationReview.pending, (state) => {
          //   state.status = 'loading';
          // })
          .addCase(fetchLocationReviews.fulfilled, (state, action) => {
            // state.status = 'succeeded';
            state.selectedLocationReviews = action.payload;
            state.error = null;
          })
          .addCase(fetchLocationReviews.rejected, (state, action) => {
            // state.status = 'failed';
            state.error = action.error.message;
          });
      }
});

export const { clearSelectedLocationReviews } = locationReviewSlice.actions;

export default locationReviewSlice.reducer;

// Selectors
export const selectLocationReviews = (state: RootState) => state.locationReview.selectedLocationReviews;
// export const selectLocationReviewStatus = (state: RootState) => state.locationReview.status;
export const selectLocationReviewError =  (state: RootState) => state.locationReview.error;