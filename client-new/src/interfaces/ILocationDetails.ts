import { ILocationReview } from "./ILocationReview";

export interface ILocationDetails {
    placeId: string;
    name: string;
    address: string;
    upvotes: number;
    downvotes: number;
    reviews: Array<ILocationReview>;
}