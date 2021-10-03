import { getData, postData } from '../helpers/http';
import { LocationReview } from '../interfaces/LocationReview';
import { LOCATION_REVIEW_API_URL } from '../constants';

export interface LocationReviewsWithCount {
    locationReviews: Array<LocationReview>;
    count: number;
};

const LocationReviewAPI = {
    /**
     * Gets reviews of a location
     * @param locationId
     * @returns Array<ILocationReview>
     */
    getWithSkip: (locationId: string, skip: number, limit: number) => {
        return getData<LocationReviewsWithCount>(`${LOCATION_REVIEW_API_URL}${locationId}?skip=${skip}&limit=${limit}`);
    },
    /**
     * Gets 5 most recent reviews of a location
     * @param locationId
     * @returns Array<ILocationReview>
     */
    getRecent: (locationId: string) => {
        return getData<Array<LocationReview>>(`${LOCATION_REVIEW_API_URL}getRecentLocationReviews/${locationId}`);
    },
    /**
     * Creates a new review
     * @param locationReview
     * @returns ILocationReview
     */
    post: (locationReview: LocationReview) => {
        return postData(LOCATION_REVIEW_API_URL, locationReview);
    }
}

export default LocationReviewAPI;