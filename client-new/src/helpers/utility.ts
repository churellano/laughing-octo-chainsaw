import { Point } from "geojson";

export default class Utility {
    static calculateScore = (upvotes: number, downvotes: number) => (upvotes) / (upvotes + downvotes);

    static decimalToPercent = (decimal: number) => Math.floor(decimal * 100);

    static pointToLatLng = (point: Point) => new google.maps.LatLng(point.coordinates[1], point.coordinates[0]);

    static isUserLocationEnabled = () => { console.log('isUserLocationEnabled'); return 'geolocation' in navigator } ;
}