import { getData, postData } from '../helpers/http';
import { ILocationReview } from '../interfaces/ILocationReview';
import { LOCATION_REVIEW_API_URL } from '../constants';

const LocationReviewAPI = {
    /**
     * Gets reviews of a location
     * @param locationId
     * @returns Array<ILocationReview>
     */
    get: (locationId: string) => {
        return getData<Array<ILocationReview>>(LOCATION_REVIEW_API_URL + locationId);
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