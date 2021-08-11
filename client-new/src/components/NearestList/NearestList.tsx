import { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Box from '@material-ui/core/Box';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';

import { computeDistanceBetween } from 'spherical-geometry-js';
import { Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux';
import { selectLatLng, selectNearestLocationDetails } from '../../features/locationDetails/LocationDetailsSlice';
import { ILocationDetails } from '../../interfaces/ILocationDetails';
import { Point } from 'geojson';

const decimalToPercent = (decimal: number) => Math.floor(decimal * 100);

function NearestList() {
    const nearestLocationDetails = useSelector(selectNearestLocationDetails);
    const currentLatLng = useSelector(selectLatLng);

    const calculateScore = (locationDetails: ILocationDetails) => locationDetails.upvotes / (locationDetails.upvotes + locationDetails.downvotes);
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
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={locationDetails.name}
                                        secondary={
                                            <Box component='div' display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                                                <span>{currentLatLng && (computeDistanceBetween(currentLatLng, pointToLatLng(locationDetails.point)) / 1000).toFixed(2)} km</span>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap',
                                                }}>
                                                    <span>{decimalToPercent(calculateScore(locationDetails))}%</span>
                                                    {calculateScore(locationDetails) > 0.5 ? <ThumbUpIcon fontSize='small' style={{ color: green[500] }}/> : <ThumbDownIcon fontSize='small' style={{ color: red[500] }}/>}
                                                </div>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                {/* Only place dividers between list items */}
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