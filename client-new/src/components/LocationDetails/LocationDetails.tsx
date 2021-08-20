import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import { yellow } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';
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
    selectLocationDetailsStatus,
    selectLocationDetailsError
} from "../../features/locationDetails/LocationDetailsSlice";
import {
    fetchRecentLocationReviews,
    selectRecentLocationReviews,
    selectLocationReviewsStatus
} from '../../features/locationReview/LocationReviewSlice'
import SubmitReviewModal from "../SubmitReviewModal";
import Utility from '../../helpers/utility';

const buildRecommendString = (locationDetails: ILocationDetails) => {
    const reviewsLength = (typeof locationDetails.reviews !== undefined && locationDetails.reviews) ? locationDetails.reviews.length : 0; 
    
    let recommendString = `${Utility.decimalToPercent(Utility.calculateScore(locationDetails.upvotes, locationDetails.downvotes))}% recommend this location `;
    if (reviewsLength === 0) {
        recommendString = 'No reviews yet. Be the first!';
    } else if (reviewsLength === 1) {
        recommendString += '(1 review)';
    } else {
        recommendString += `(${reviewsLength} reviews)`;
    }

    return recommendString;
}

const scoreColor = (locationDetails: ILocationDetails) => {
    if (!locationDetails.reviews || locationDetails.reviews.length === 0) {
        return grey[500];
    } 

    let color;
    const score = Utility.calculateScore(locationDetails.upvotes, locationDetails.downvotes);
    if (score > 0.8) {
        color = green[500];
    }
    else if (score > 0.55) {
        color = green[300];
    }
    else if (score > 0.45) {
        color = yellow[700];
    }
    else if (score > 0.2) {
        color = red[300];
    } else {
        color = red[500];
    }

    return color;
}

const renderReviews = (locationReviews: Array<ILocationReview>) => (
    <Box style={{'width': '100%'}}>
        <Paper variant='outlined'>
            <LocationReviews locationReviews={locationReviews} />
        </Paper>
    </Box>
)

const renderPage = (locationDetails: ILocationDetails) => (
    <Fragment>
        <Box mb={2} style={{'width': '100%'}}>
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
                        <ThumbsUpDownIcon style={{ color: scoreColor(locationDetails), 'paddingRight': '12px'}}/>
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
    const locationDetailsStatus = useSelector(selectLocationDetailsStatus);
    const error = useSelector(selectLocationDetailsError);
    const recentLocationReviews = useSelector(selectRecentLocationReviews);
    const locationReviewsStatus = useSelector(selectLocationReviewsStatus);

    useEffect(() => {
        if (placeId && locationDetailsStatus === 'idle') {
            dispatch(fetchLocationDetails(placeId));
        } else if (
            placeId &&
            locationDetails &&
            placeId === locationDetails.placeId &&
            locationDetails._id &&
            locationReviewsStatus === 'idle'
        ) {
            // Only check for reviews if the location is known to the database
            dispatch(fetchRecentLocationReviews(locationDetails._id));
        }
    }, [dispatch, placeId, locationDetails, locationDetailsStatus, recentLocationReviews, locationReviewsStatus]);

    let content;
    if (placeId && !locationDetails && !error) {
        // Data not received yet
        content = renderLoading();
    } else if (placeId && locationDetails && recentLocationReviews.length > 0 && !error) {
        // Data received with details and reviews
        content = renderPage({ ...locationDetails, reviews: recentLocationReviews}); 
    } else if (placeId && locationDetailsFromMaps && recentLocationReviews.length === 0) {
        // Selected location is unknown to database, display data from Maps
        content = renderPage(locationDetailsFromMaps);
    } else if (!locationDetailsFromMaps || error) {
        content = error;
    }

    return (
        <Box style={{ width: '100%'}}>
            {content}
        </Box>
    ) ;
}

export default LocationDetails;