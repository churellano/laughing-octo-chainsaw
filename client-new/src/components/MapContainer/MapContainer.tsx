import { GOOGLE_API_KEY } from '../../.api-keys';
import { GoogleMap, LoadScript, } from '@react-google-maps/api';
import { Component } from 'react';
import { Loader } from "@googlemaps/js-api-loader"
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';

const containerStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexGrow: 1
};
  
const defaultCenter = {
    lat: 49.246292,
    lng: -123.116226
};

interface MapState {
    googleMapsReady: boolean;
    loader: Loader | null;
    lat: number;
    lng: number;
    map: google.maps.Map | null;
    placeResult: google.maps.places.PlaceResult | null;
}

const googleMapsLibrariesToLoad: Libraries = ['geometry', 'places'];

class MapContainer extends Component<any, MapState> {

    constructor(props: any) {
        super(props);
        this.state = {
            googleMapsReady: false,
            loader: null,
            lat: defaultCenter.lat,
            lng: defaultCenter.lng,
            map: null,
            placeResult: null
        };
    }

    // Retrieves information about a named location on Google Maps
    findPlaceById = (placeId: string | null) => {
        console.log('Looking for place with Id: ', placeId);
        if (google.maps.places && this.state.map) {
            let service = new google.maps.places.PlacesService(this.state.map);
            let request = {
                placeId,
                fields: ['formatted_address', 'geometry', 'name']
            } as google.maps.places.PlaceDetailsRequest;

            service.getDetails(request, (placeResult, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && placeResult) {
                    this.setState({ placeResult }, () => console.log('result: ', this.state.placeResult));
                }
            });
        }
    };

    componentDidMount() {
        // Get location of user in order to center the map
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }, () => {
                    this.state.map?.setCenter({ lat: this.state.lat, lng: this.state.lng });
                });
            });
        }
    }
    
    render() {
        return (
            <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={googleMapsLibrariesToLoad}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{lat: this.state.lat, lng: this.state.lng}}
                    zoom={15}
                    onClick={(e: google.maps.MapMouseEvent | google.maps.IconMouseEvent) => ('placeId' in e) && this.findPlaceById(e.placeId)}
                    onLoad={map => this.setState({ map })}
                >
                </GoogleMap>
            </LoadScript>
        );
    }
    
}

export default MapContainer;