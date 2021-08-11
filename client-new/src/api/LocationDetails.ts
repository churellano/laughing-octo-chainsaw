import { getData, postData } from '../helpers/http';
import { ILocationDetails } from '../interfaces/ILocationDetails';
import { LOCATION_DETAILS_API_URL } from '../constants';
import { Point } from 'geojson';

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
     * Gets nearest Location Details to a point
     * @param point
     * @returns Array<ILocationDetails>
     */
    getNearest: (point: Point) => getData<Array<ILocationDetails>>(`${LOCATION_DETAILS_API_URL}getNearestLocationDetails/${point.coordinates[1]},${point.coordinates[0]}`),

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