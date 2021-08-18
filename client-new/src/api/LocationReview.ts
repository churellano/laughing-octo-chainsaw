import { getData, postData } from '../helpers/http';
import { ILocationReview } from '../interfaces/ILocationReview';
import { LOCATION_REVIEW_API_URL } from '../constants';

export interface LocationReviewsWithCount {
    locationReviews: Array<ILocationReview>;
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
        return getData<Array<ILocationReview>>(`${LOCATION_REVIEW_API_URL}getRecentLocationReviews/${locationId}`);
    },
    /**
     * Creates a new review
     * @param locationReview
     * @returns ILocationReview
     */
    post: (locationReview: ILocationReview) => {
        return postData(LOCATION_REVIEW_API_URL, locationReview);
    }
}

export default LocationReviewAPI;