import { LocationReview } from "./LocationReview";
import { Point } from 'geojson';

export interface LocationDetails {
    _id: string | null;
    placeId: string;
    name: string;
    address: string;
    point: Point;
    upvotes: number;
    downvotes: number;
    reviews: Array<LocationReview>;
}