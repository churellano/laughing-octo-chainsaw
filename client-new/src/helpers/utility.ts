import { Point } from "geojson";

export default class Utility {
    static calculateScore = (upvotes: number, downvotes: number) => (upvotes) / (upvotes + downvotes);

    static decimalToPercent = (decimal: number) => Math.floor(decimal * 100);

    static pointToLatLngLiteral = (point: Point) => ({
        lat: point.coordinates[1],
        lng: point.coordinates[0]
    });

    static isUserLocationEnabled = () => { console.log('isUserLocationEnabled'); return 'geolocation' in navigator } ;
}