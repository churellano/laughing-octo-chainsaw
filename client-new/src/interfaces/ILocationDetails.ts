import { ILocationReview } from "./ILocationReview";
import { Point } from 'geojson';

export interface ILocationDetails {
    _id: string | null;
    placeId: string;
    name: string;
    address: string;
    point: Point;
    upvotes: number;
    downvotes: number;
    reviews: Array<ILocationReview>;
}