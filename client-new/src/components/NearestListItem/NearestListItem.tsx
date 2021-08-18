import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedPlaceId } from '../../features/locationDetails/LocationDetailsSlice';
import { clearSelectedLocationReviews } from '../../features/locationReview/LocationReviewSlice';
import { ILocationDetails } from '../../interfaces/ILocationDetails';

import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

interface NearestListItemProps {
    locationDetails: ILocationDetails;
    distance: number | null;
};

function NearestListItem({ locationDetails, distance }: NearestListItemProps ) {
    const dispatch = useDispatch();

    const calculateScore = (upvotes: number, downvotes: number) => (upvotes) / (upvotes + downvotes);
    const decimalToPercent = (decimal: number) => Math.floor(decimal * 100);

    const handleClick = (locationDetails: ILocationDetails) => {
        dispatch(setSelectedPlaceId(locationDetails.placeId));
        dispatch(clearSelectedLocationReviews());
    }

    return (
        <ListItem alignItems="flex-start" onClick={() => handleClick(locationDetails)} style={{ cursor: 'pointer' }}>
            <ListItemText
                primary={locationDetails.name}
                secondary={
                    <Box component='div' display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <span>{distance && distance.toFixed(2)} km</span>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}>
                            <span>{decimalToPercent(calculateScore(locationDetails.upvotes, locationDetails.downvotes))}%</span>
                            {calculateScore(locationDetails.upvotes, locationDetails.downvotes) > 0.5 ? <ThumbUpIcon fontSize='small' style={{ color: green[500] }}/> : <ThumbDownIcon fontSize='small' style={{ color: red[500] }}/>}
                        </div>
                    </Box>
                }
            />
        </ListItem>
    );
}

export default NearestListItem;