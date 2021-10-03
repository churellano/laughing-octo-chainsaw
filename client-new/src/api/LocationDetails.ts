import { getData, postData } from '../helpers/http';
import { LocationDetails } from '../interfaces/LocationDetails';
import { LOCATION_DETAILS_API_URL } from '../constants';
import { Point } from 'geojson';

const LocationDetailsAPI = {
    /**
     * Gets Location Details
     * @param placeId
     * @returns LocationDetails
     */
    getOne: (placeId: string) => {
        return getData<LocationDetails>(LOCATION_DETAILS_API_URL + placeId);
    },

    /**
     * Gets nearest Location Details to a point
     * @param point
     * @returns Array<LocationDetails>
     */
    getNearest: (point: Point) => getData<Array<LocationDetails>>(`${LOCATION_DETAILS_API_URL}getNearestLocationDetails/${point.coordinates[1]},${point.coordinates[0]}`),

    /**
     * Creates a new record of a Location
     * @param locationDetails
     * @returns LocationDetails
     */
    post: (locationDetails: LocationDetails) => {
        return postData<LocationDetails>(LOCATION_DETAILS_API_URL, locationDetails);
    }
}

export default LocationDetailsAPI;