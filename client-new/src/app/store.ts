import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import locationDetailsReducer from '../features/locationDetails/LocationDetailsSlice';
import locationReviewReducer from '../features/locationReview/LocationReviewSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    locationDetails: locationDetailsReducer,
    locationReview: locationReviewReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
