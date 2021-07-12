import { getData, postData } from '../helpers/http';
import { ILocationReview } from '../interfaces/ILocationReview';
import { LOCATION_REVIEW_API } from '../constants';

// export interface ILocationReviewService {
//     selectedLocationReviews: Array<ILocationReview>;
//     findLocationReviews: (locationId: string) => Promise<ILocationReview>;
//     createLocationReview: (locationReview: ILocationReview) => Promise<ILocationReview>;
// }

// export const LocationReviewApiContext = createContext<ILocationReviewService | null>(null);

// export const LocationReviewApiProvider = (props: any) => {
//     const value = {
//         selectedLocationReviews: props.selectedLocationReviews || [],
//         findLocationReviews: props.findLocationReviews || findLocationReviews,
//         createLocationReview: props.createLocationReview || createLocationReview
//     }

//     return (
//         <LocationReviewApiContext.Provider value={value}>
//             {props.children}
//         </LocationReviewApiContext.Provider>
//     );
// }

// export const useLocationReviewApiContext = () => useContext(LocationReviewApiContext);

export const findLocationReviews = (locationId: string) => {
    return getData<Array<ILocationReview>>(LOCATION_REVIEW_API + locationId);
}

export const createLocationReview = (locationReview: ILocationReview) => {
    return postData(LOCATION_REVIEW_API, locationReview);
}