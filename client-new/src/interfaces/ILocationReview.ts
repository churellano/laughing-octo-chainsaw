import { IUSer } from "./IUser";

export interface ILocationReview {
    _id: string;
    locationId: string;
    user: IUSer;
    description: string;
    postedDate: Date;
    recommend: boolean;
};