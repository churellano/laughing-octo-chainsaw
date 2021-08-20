import { GOOGLE_API_KEY } from '../../constants';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { CSSProperties, useEffect, useState } from 'react';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { setSelectedPlaceId, setSelectedLatLng, setSelectedLocationDetailsFromMaps, fetchNearestLocationDetails, selectLatLng, selectLocationDetails } from '../../features/locationDetails/LocationDetailsSlice';
import { clearSelectedLocationReviews } from '../../features/locationReview/LocationReviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from "@material-ui/core";
import Utility from '../../helpers/utility';

const containerStyle = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexGrow: 1
} as CSSProperties;

const defaultCenter = {
    lat: 49.246292,
    lng: -123.116226
};

const googleMapsLibrariesToLoad: Libraries = ['geometry', 'places'];

function MapContainer() {
    const dispatch = useDispatch();
    const [lat, setLat] = useState(defaultCenter.lat);
    const [lng, setLng] = useState(defaultCenter.lng);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const selectedLatLng = useSelector(selectLatLng);
    // const selectedLocationDetails = useSelector(selectLocationDetails);

    useEffect(() => {
        // Get location of user in order to center the map
        if (navigator.geolocation && map) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);

                const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                map.setCenter(latLng);
                dispatch(fetchNearestLocationDetails({
                    type: "Point",
                    coordinates: [position.coords.longitude, position.coords.latitude]
                }));
                dispatch(setSelectedLatLng(latLng));
            });
        }
    }, [dispatch, map]);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_API_KEY,
        libraries: googleMapsLibrariesToLoad
    });

    const handleClick = (e: google.maps.MapMouseEvent | google.maps.IconMouseEvent) => {
        const lat = e.latLng?.lat();
        const lng = e.latLng?.lng();
        if (e && e.latLng && lat && lng) {
            setLat(lat);
            setLng(lng);
            dispatch(fetchNearestLocationDetails({
                type: "Point",
                coordinates: [lng, lat]
            }));
            dispatch(setSelectedLatLng(new google.maps.LatLng(lat, lng)));
        }

        if ('placeId' in e && e.placeId) {
            findPlaceById(e.placeId);
        }
    }

    // Retrieves information about a named location on Google Maps
    const findPlaceById = (placeId: string) => {
        if (google.maps.places && map) {
            let service = new google.maps.places.PlacesService(map);
            let request = {
                placeId,
                fields: ['formatted_address', 'geometry', 'name', 'place_id']
            } as google.maps.places.PlaceDetailsRequest;

            service.getDetails(request, (placeResult, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && placeResult) {
                    dispatch(setSelectedPlaceId(placeId));
                    dispatch(setSelectedLocationDetailsFromMaps(placeResult));
                    dispatch(clearSelectedLocationReviews());
                }
            });
        }
    };

    const renderMap = () => (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat, lng }}
            zoom={15}
            onClick={(e: google.maps.MapMouseEvent | google.maps.IconMouseEvent) => handleClick(e)}
            onLoad={map => setMap(map)}
        >
            { selectedLatLng && <Marker position={selectedLatLng} />}
        </GoogleMap>
    );

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    return isLoaded ? renderMap() : <CircularProgress />
}

export default MapContainer;