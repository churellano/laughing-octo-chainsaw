import { ILocationDetails } from "./ILocationDetails";
import { IUSer } from "./IUser";

export interface ILocationReview {
    _id: string;
    locationDetails: ILocationDetails;
    user: IUSer;
    description: string;
    postedDate: Date;
    recommend: boolean;
};