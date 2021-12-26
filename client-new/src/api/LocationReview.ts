import { getData, postData } from '../helpers/http';
import { LocationReview } from '../interfaces/LocationReview';
import { LOCATION_REVIEW_API_URL } from '../constants';

export interface LocationReviewsWithCount {
    locationReviews: Array<LocationReview>;
    count: number;
};

const LocationReviewAPI = {
    /**
     * Gets all reviews written by a user
     * @param username
     * @returns Array<LocationReview>
     */
    getByUsernameWithSkip: (username: string, skip: number, limit: number) => {
        return getData<LocationReviewsWithCount>(`${LOCATION_REVIEW_API_URL}getByUsernameWithSkip/${username}?skip=${skip}&limit=${limit}`);
    },
    /**
     * Gets reviews of a location
     * @param locationId
     * @returns Array<LocationReview>
     */
    getWithSkip: (locationId: string, skip: number, limit: number) => {
        return getData<LocationReviewsWithCount>(`${LOCATION_REVIEW_API_URL}${locationId}?skip=${skip}&limit=${limit}`);
    },
    /**
     * Gets 5 most recent reviews of a location
     * @param locationId
     * @returns Array<LocationReview>
     */
    getRecent: (locationId: string) => {
        return getData<Array<LocationReview>>(`${LOCATION_REVIEW_API_URL}getRecentLocationReviews/${locationId}`);
    },
    /**
     * Creates a new review
     * @param locationReview
     * @returns LocationReview
     */
    post: (locationReview: LocationReview) => {
        return postData(LOCATION_REVIEW_API_URL, locationReview);
    }
}

export default LocationReviewAPI;