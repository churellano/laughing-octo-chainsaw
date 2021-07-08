import { getData } from '../helpers/http';

const API_URL = 'localhost:3000';
const RESOURCE = 'LocationDetails';

export const findLocationDetails = (placeId: string) => {
    return getData(`${API_URL}/${RESOURCE}/${placeId}`);
}