import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store';
import { ILocationDetails } from '../../interfaces/ILocationDetails';
import LocationDetailsAPI from '../../api/LocationDetails';

interface LocationDetailsState {
    selectedPlaceId: string | null;
    selectedLocationDetails: ILocationDetails | null;
    selectedLocationDetailsFromMaps: ILocationDetails | null;
    // status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null | undefined
}

const initialState: LocationDetailsState = {
    selectedPlaceId: null,
    selectedLocationDetails: null,
    selectedLocationDetailsFromMaps: null,
    // status: 'idle',
    error: null
}

export const fetchLocationDetails = createAsyncThunk('locationDetails/fetchLocationDetails', async (placeId: string) => {
    const response = await LocationDetailsAPI.getOne(placeId);
    return response;
});

export const locationDetailsSlice = createSlice({
    name: 'locationDetails',
    initialState,
    reducers: {
      setSelectedPlaceId: (state, action: PayloadAction<string>) => {
          state.selectedPlaceId = action.payload;
      },
      setSelectedLocationDetailsFromMaps: (state, action: PayloadAction<google.maps.places.PlaceResult>) => {
        state.selectedLocationDetailsFromMaps = {
          placeId: action.payload.place_id,
          name: action.payload.name,
          address: action.payload.formatted_address,
          upvotes: 0,
          downvotes: 0,
        } as ILocationDetails;
      }
    },
    extraReducers: (builder) => {
        builder
          // .addCase(fetchLocationDetails.pending, (state) => {
          //   state.status = 'loading';
          // })
          .addCase(fetchLocationDetails.fulfilled, (state, action) => {
            // state.status = 'succeeded';
            state.selectedLocationDetails = action.payload;
            state.error = null;
          })
          .addCase(fetchLocationDetails.rejected, (state, action) => {
            // state.status = 'failed';
            state.error = action.error.message;
          });
      }
});

export const { setSelectedPlaceId, setSelectedLocationDetailsFromMaps } = locationDetailsSlice.actions;

export default locationDetailsSlice.reducer;

// Selectors
export const selectPlaceId = (state: RootState) => state.locationDetails.selectedPlaceId;
export const selectLocationDetails = (state: RootState) => state.locationDetails.selectedLocationDetails;
export const selectLocationDetailsFromMaps = (state: RootState) => state.locationDetails.selectedLocationDetailsFromMaps;
// export const selectLocationDetailsStatus = (state: RootState) => state.locationDetails.status;
export const selectLocationDetailsError =  (state: RootState) => state.locationDetails.error;