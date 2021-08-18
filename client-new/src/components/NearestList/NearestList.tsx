import { Fragment } from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { computeDistanceBetween } from 'spherical-geometry-js';
import { Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux';
import { selectLatLng, selectNearestLocationDetails } from '../../features/locationDetails/LocationDetailsSlice';
import { ILocationDetails } from '../../interfaces/ILocationDetails';
import { Point } from 'geojson';
import NearestListItem from '../NearestListItem';


function NearestList() {
    const nearestLocationDetails = useSelector(selectNearestLocationDetails);
    const currentLatLng = useSelector(selectLatLng);

    const pointToLatLng = (point: Point) => new google.maps.LatLng(point.coordinates[1], point.coordinates[0]);

    return (
        <Box mr={2} style={{ 'maxWidth': '30%', 'width': '30%' }}>
            <Paper variant='outlined'>
                <Box p={1}>
                    <Typography variant='h5'>Nearest washrooms</Typography>
                </Box>
                <List style={{ 'minWidth': '20%' }}>
                    {
                        nearestLocationDetails.map((locationDetails: ILocationDetails, index) => (
                            <Fragment>
                                <NearestListItem locationDetails={locationDetails} distance={currentLatLng && (computeDistanceBetween(currentLatLng, pointToLatLng(locationDetails.point)) / 1000)} />
                                {(index + 1 === nearestLocationDetails.length) ? null : <Divider />}
                            </Fragment>
                        ))
                    }
                </List>
            </Paper>
        </Box>
    );
}

export default NearestList;