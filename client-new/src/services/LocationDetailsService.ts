import { getData, postData } from '../helpers/http';
import { ILocationDetails } from '../interfaces/ILocationDetails';
import { LOCATION_DETAILS_API } from '../constants';

// export interface ILocationDetailsService {
//     selectedLocationDetails: ILocationDetails;
//     findLocationDetails: (placeId: string) => Promise<ILocationDetails>;
//     createLocationDetails: (locationDetails: ILocationDetails) => Promise<ILocationDetails>;
// }

// export const LocationDetailsApiContext = createContext<ILocationDetailsService | null>(null);

// export const LocationDetailsApiProvider = (props: any) => {
//     const value = {
//         selectedLocationDetails: props.selectedLocationDetails || null,
//         findLocationDetails: props.findLocationDetails || findLocationDetails,
//         createLocationDetails: props.createLocationDetails || createLocationDetails
//     }

//     return (
//         <LocationDetailsApiContext.Provider value={value}>
//             {props.children}
//         </LocationDetailsApiContext.Provider>
//     );
// }

// export const useLocationDetailsApiContext = () => useContext(LocationDetailsApiContext);

export const findLocationDetails = (placeId: string) => {
    return getData<ILocationDetails>(LOCATION_DETAILS_API + placeId);
}

export const createLocationDetails = (locationDetails: ILocationDetails) => {
    return postData(LOCATION_DETAILS_API, locationDetails);
}