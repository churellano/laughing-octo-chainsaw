import { LocationDetails } from "./LocationDetails";
import { User } from "./User";

export interface LocationReview {
    _id: string;
    locationDetails: LocationDetails;
    user: User;
    description: string;
    postedDate: Date;
    recommend: boolean;
};