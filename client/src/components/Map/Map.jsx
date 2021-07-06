import { GOOGLE_API_KEY } from '../../api-keys';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useEffect, useState } from 'react';

const containerStyle = {
    width: '600px',
    height: '600px',
    // margin: 'auto'
};
  
const defaultCenter = {
    lat: 49.246292,
    lng: -123.116226
};

function Map() {
    const [center, setCenter] = useState(defaultCenter);
    
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    });

    return (
        <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
            >
            </GoogleMap>
        </LoadScript>
    );
}

export default Map;