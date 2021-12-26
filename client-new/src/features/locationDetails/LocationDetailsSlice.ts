import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store';
import { LocationDetails } from '../../interfaces/LocationDetails';
import LocationDetailsAPI from '../../api/LocationDetails';
import { Point } from 'geojson';

interface LocationDetailsState {
    selectedPlaceId: string | null;
    selectedLatLng: google.maps.LatLngLiteral | null;
    selectedLocationDetails: LocationDetails | null;
    selectedLocationDetailsFromMaps: LocationDetails | null,
    nearestLocationDetails: Array<LocationDetails>,
    nearestLocationDetailsStatus: 'idle' | 'loading' | 'succeeded' | 'failed',
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null | undefined
}

const initialState: LocationDetailsState = {
    selectedPlaceId: null,
    selectedLatLng: null,
    selectedLocationDetails: null,
    selectedLocationDetailsFromMaps: null,
    nearestLocationDetails: [],
    nearestLocationDetailsStatus: 'idle',
    status: 'idle',
    error: null
}

export const fetchLocationDetails = createAsyncThunk('locationDetails/fetchLocationDetails', async (placeId: string) => {
    const response = await LocationDetailsAPI.getOne(placeId);
    return response;
});

export const fetchNearestLocationDetails = createAsyncThunk('locationDetails/fetchNearestLocationDetails', async (point: Point) => {
  const response = await LocationDetailsAPI.getNearest(point);
  return response;
});

export const locationDetailsSlice = createSlice({
    name: 'locationDetails',
    initialState,
    reducers: {
      setSelectedPlaceId: (state, action: PayloadAction<string>) => {
          state.selectedPlaceId = action.payload;
          state.nearestLocationDetailsStatus = 'idle';
          state.status = 'idle';
      },
      setSelectedLatLng: (state, action: PayloadAction<google.maps.LatLngLiteral>) => {
        state.selectedLatLng = action.payload;
        state.nearestLocationDetailsStatus = 'idle';
      },
      setSelectedLocationDetailsFromMaps: (state, action: PayloadAction<google.maps.places.PlaceResult>) => {
        state.selectedLocationDetailsFromMaps = {
          placeId: action.payload.place_id,
          name: action.payload.name,
          address: action.payload.formatted_address,
          upvotes: 0,
          downvotes: 0,
        } as LocationDetails;
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchLocationDetails.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.selectedLocationDetails = action.payload;
            state.error = null;
          })
          .addCase(fetchLocationDetails.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(fetchNearestLocationDetails.pending, (state) => {
            state.nearestLocationDetailsStatus = 'loading';
          })
          .addCase(fetchNearestLocationDetails.fulfilled, (state, action) => {
            state.nearestLocationDetailsStatus = 'succeeded';
            state.nearestLocationDetails = action.payload;
            state.error = null;
          })
          .addCase(fetchNearestLocationDetails.rejected, (state, action) => {
            state.nearestLocationDetailsStatus = 'failed';
            state.error = action.error.message;
          });
      }
});

export const {
  setSelectedPlaceId,
  setSelectedLatLng,
  setSelectedLocationDetailsFromMaps
} = locationDetailsSlice.actions;

export default locationDetailsSlice.reducer;

// Selectors
export const selectPlaceId = (state: RootState) => state.locationDetails.selectedPlaceId;
export const selectLatLng = (state: RootState) => state.locationDetails.selectedLatLng;
export const selectLocationDetails = (state: RootState) => state.locationDetails.selectedLocationDetails;
export const selectLocationDetailsFromMaps = (state: RootState) => state.locationDetails.selectedLocationDetailsFromMaps;
export const selectNearestLocationDetails = (state: RootState) => state.locationDetails.nearestLocationDetails;
export const selectNearestLocationDetailsStatus = (state: RootState) => state.locationDetails.nearestLocationDetailsStatus;
export const selectLocationDetailsStatus = (state: RootState) => state.locationDetails.status;
export const selectLocationDetailsError =  (state: RootState) => state.locationDetails.error;