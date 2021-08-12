import { GOOGLE_API_KEY } from '../../constants';
import { GoogleMap, LoadScript, } from '@react-google-maps/api';
import { Component } from 'react';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { setSelectedPlaceId, setSelectedLatLng, setSelectedLocationDetailsFromMaps, fetchNearestLocationDetails } from '../../features/locationDetails/LocationDetailsSlice';
import { clearSelectedLocationReviews } from '../../features/locationReview/LocationReviewSlice';
import { connect } from 'react-redux';

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
            lat: defaultCenter.lat,
            lng: defaultCenter.lng,
            map: null,
            placeResult: null
        };
    }

    handleClick = (e: google.maps.MapMouseEvent | google.maps.IconMouseEvent) => {
        const lat = e.latLng?.lat();
        const lng = e.latLng?.lng();
        console.log('handleClick', lat, lng);
        if (e && e.latLng && lat && lng) {
            this.setState({lat, lng});
            this.props.fetchNearestLocationDetails({
                type: "Point",
                coordinates: [lng, lat]
            });
            this.props.setSelectedLatLng(new google.maps.LatLng(lat, lng));
        }

        if ('placeId' in e) {
            this.findPlaceById(e.placeId);
        }
    }

    // Retrieves information about a named location on Google Maps
    findPlaceById = (placeId: string | null) => {
        console.log('Looking for place with Id: ', placeId);
        if (google.maps.places && this.state.map) {
            let service = new google.maps.places.PlacesService(this.state.map);
            let request = {
                placeId,
                fields: ['formatted_address', 'geometry', 'name', 'place_id']
            } as google.maps.places.PlaceDetailsRequest;

            service.getDetails(request, (placeResult, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && placeResult) {
                    this.props.setSelectedPlaceId(placeId);
                    this.props.setSelectedLocationDetailsFromMaps(placeResult);
                    this.props.clearSelectedLocationReviews();
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
                this.props.fetchNearestLocationDetails({
                    type: "Point",
                    coordinates: [position.coords.longitude, position.coords.latitude]
                });
                this.props.setSelectedLatLng(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
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
                    onClick={(e: google.maps.MapMouseEvent | google.maps.IconMouseEvent) => this.handleClick(e)}
                    onLoad={map => this.setState({ map })}
                >
                    
                </GoogleMap>
            </LoadScript>
        );
    }
    
}

// const mapStateToProps = (state, ownProps) => ({
//     // ... computed data from state and optionally ownProps
// })
  
const mapDispatchToProps = {
    setSelectedPlaceId,
    setSelectedLatLng,
    setSelectedLocationDetailsFromMaps,
    clearSelectedLocationReviews,
    fetchNearestLocationDetails
}

export default connect(null, mapDispatchToProps)(MapContainer);