import { getData, postData } from '../helpers/http';
import { ILocationDetails } from '../interfaces/ILocationDetails';
import { LOCATION_DETAILS_API_URL } from '../constants';

const LocationDetailsAPI = {
    /**
     * Gets Location Details
     * @param placeId
     * @returns ILocationDetails
     */
    getOne: (placeId: string) => {
        return getData<ILocationDetails>(LOCATION_DETAILS_API_URL + placeId);
    },

    /**
     * Creates a new record of a Location
     * @param locationDetails
     * @returns ILocationDetails
     */
    post: (locationDetails: ILocationDetails) => {
        return postData(LOCATION_DETAILS_API_URL, locationDetails);
    }
}

export default LocationDetailsAPI;