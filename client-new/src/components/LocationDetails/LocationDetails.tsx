import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import RoomIcon from '@material-ui/icons/Room';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';

import LocationReviews from '../LocationReviews';
import { ILocationDetails } from "../../interfaces/ILocationDetails";
import { ILocationReview } from "../../interfaces/ILocationReview";
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectPlaceId,
    fetchLocationDetails,
    selectLocationDetails,
    selectLocationDetailsFromMaps,
    selectLocationDetailsError
} from "../../features/locationDetails/LocationDetailsSlice";
import {
    fetchLocationReviews,
    selectLocationReviews,
    selectLocationReviewsStatus,
} from '../../features/locationReview/LocationReviewSlice'
import SubmitReviewModal from "../SubmitReviewModal";

const decimalToPercent = (decimal: number) => Math.floor(decimal * 100);

const buildRecommendString = (locationDetails: ILocationDetails) => {
    const reviewsLength = (typeof locationDetails.reviews !== undefined && locationDetails.reviews) ? locationDetails.reviews.length : 0; 
    
    let recommendString = `${decimalToPercent(calculateScore(locationDetails.upvotes, locationDetails.downvotes))}% recommend this location `;
    if (reviewsLength === 0) {
        recommendString = 'No reviews yet. Be the first!';
    } else if (reviewsLength === 1) {
        recommendString += '(1 review)';
    } else {
        recommendString += `(${reviewsLength} reviews)`;
    }

    return recommendString;
}

const calculateScore = (upvotes: number, downvotes: number) => (upvotes) / (upvotes + downvotes);

const renderReviews = (locationReviews: Array<ILocationReview>) => (
    <Box m={1} style={{'width': '100%'}}>
        <Paper variant='outlined'>
            <LocationReviews locationReviews={locationReviews} />
        </Paper>
    </Box>
)

const renderPage = (locationDetails: ILocationDetails) => (
    <Fragment>
        <Box ml={1} mb={2} style={{'width': '100%'}}>
            <Paper variant='outlined'>
                <Box p={1}>
                    <Typography variant='h5'>{locationDetails?.name}</Typography>
                </Box>
                <List>
                    <ListItem>
                        <RoomIcon style={{'paddingRight': '12px'}}/>
                        <ListItemText primary={locationDetails?.address} />
                    </ListItem>
                    <ListItem>
                        <ThumbsUpDownIcon style={{ color: (calculateScore(locationDetails.upvotes, locationDetails.downvotes) > 0.5) ? green[500] : red[500], 'paddingRight': '12px'}}/>
                        <ListItemText primary={buildRecommendString(locationDetails)}/>
                    </ListItem>
                </List>

                <SubmitReviewModal
                    id={locationDetails._id}
                    placeId={locationDetails.placeId}
                    name={locationDetails.name}
                    address={locationDetails.address}
                />

            </Paper>
        </Box>
        { locationDetails.reviews && locationDetails.reviews.length > 0 && renderReviews(locationDetails.reviews) }
    </Fragment>
)

const renderLoading = () => (
    <Paper variant='outlined'>
        <Box p={1}>
            <Typography>Loading...</Typography>
        </Box>
    </Paper>
);

function LocationDetails() {
    const dispatch = useDispatch();
    const placeId = useSelector(selectPlaceId);
    const locationDetails = useSelector(selectLocationDetails);
    const locationDetailsFromMaps = useSelector(selectLocationDetailsFromMaps);
    const error = useSelector(selectLocationDetailsError);
    const locationReviews = useSelector(selectLocationReviews);
    const locationReviewsStatus = useSelector(selectLocationReviewsStatus);

    useEffect(() => {
        if (placeId && !locationDetails) {
            dispatch(fetchLocationDetails(placeId));
        } else if (
            placeId &&
            locationDetails &&
            placeId === locationDetails.placeId &&
            locationDetails._id &&
            locationReviewsStatus === 'idle'
        ) {
            // Only check for reviews if the location is known to the database
            dispatch(fetchLocationReviews(locationDetails._id));
        }
    }, [dispatch, placeId, locationDetails, locationReviews, locationReviewsStatus]);

    let content;
    if (placeId && !locationDetails && !error) {
        // Data not received yet
        content = renderLoading();
    } else if (placeId && locationDetails && locationReviews.length > 0 && !error) {
        // Data received with details and reviews
        content = renderPage({ ...locationDetails, reviews: locationReviews}); 
    } else if (placeId && locationDetailsFromMaps && locationReviews.length === 0) {
        // Selected location is unknown to database, display data from Maps
        content = renderPage(locationDetailsFromMaps);
    } else if (!locationDetailsFromMaps || error) {
        content = error;
    }

    return (
        <Box ml={2} style={{ 'maxWidth': '30%', 'width': '30%' }}>
            {content}
        </Box>
    ) ;
}

export default LocationDetails;