import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import RoomIcon from '@material-ui/icons/Room';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import Divider from '@material-ui/core/Divider';

import LocationReviews from '../LocationReviews';
import { ILocationDetails } from "../../interfaces/ILocationDetails";
import { ILocationReview } from "../../interfaces/ILocationReview";
import { useEffect, useState } from "react";
import { findLocationDetails } from "../../services/LocationDetailsService";

const nearestList = [
    {
        placeId: 'ChIJJW_B_DnXhVQRPirjsR6wKhc',
        name: 'McDonald\'s',
        address: '9638 160 St, Surrey, BC',
        distance: 0.14,
        score: 0.49,
        reviews: [
            {
                username: 'mcdonaldslover',
                description: 'nothing special, usually clean',
                postedDate: new Date('2021-01-01'),
                recommend: true
            },
            {
                username: 'imlovinit',
                description: 'good, but wish they had bidets',
                postedDate: new Date('2021-07-06'),
                recommend: true
            }
        ]
    },
    {
        placeId: 'ChIJKVDKWDfXhVQROFFS5VeBuuY',
        name: 'Chevron',
        address: '9610 160 St, Surrey, BC',
        distance: 0.1,
        score: 0.85,
        reviews: [
            {
                username: 'ferrariPeek',
                description: 'usually cleaner than the mcdonalds next door',
                postedDate: new Date('2021-01-02'),
                recommend: true
            }
        ]
    },
    {
        placeId: 'ChIJwex-bTnXhVQRu6H8FUkJVNI',
        name: 'North Surrey Community Park',
        address: '15898 97a Ave, Surrey, BC',
        distance: 1.4,
        score: 0.8,
        reviews: [
            {
                username: 'ultiplayer',
                description: 'not maintained very often',
                postedDate: new Date('2021-01-03'),
                recommend: false
            }
        ]
    },
    {
        placeId: 'ChIJVWLXWNPZhVQRbGogBYEKzCc',
        name: 'Simon Fraser University - Surrey Campus',
        address: '13450 102 Ave #250, Surrey, BC',
        distance: 5.3,
        score: 0.9,
        reviews: [
            {
                username: 'catcrab123',
                description: 'Use the secluded ones on the main galleria, nestled in the hallways by the theatre',
                postedDate: new Date('2021-07-07'),
                recommend: true
            }
        ]
    }
]

const decimalToPercent = (decimal: number) => Math.floor(decimal * 100);

// From https://stackoverflow.com/a/56460731
const truncate = (str: string, max = 10) => {
    const array = str.trim().split(' ');
    const ellipsis = array.length > max ? '...' : '';

    return array.slice(0, max).join(' ') + ellipsis;
};

const buildRecommendString = (locationDetails: ILocationDetails) => {
    const reviewsLength = locationDetails.reviews.length;
    let recommendString = `${decimalToPercent(nearestList[0].score)}% recommend this location `;
    if (reviewsLength === 0) {
        recommendString += '(No reviews)';
    } else if (reviewsLength === 1) {
        recommendString += '(1 review)';
    } else {
        recommendString += `(${reviewsLength} reviews)`;
    }

    return recommendString;
}

function LocationDetails() {

    const [locationDetails, setlocationDetails] = useState(null);

    useEffect(() => {
        if (!locationDetails) {
            findLocationDetails('ChIJJW_B_DnXhVQRPirjsR6wKhc')
                .then(data => console.log('data', data));
        }
    });

    return (
        <Box ml={1}>
            <Box ml={1} mb={2} style={{'width': '100%'}}>
                <Paper variant='outlined'>
                    <Box p={1}>
                        <Typography variant='h5'>{nearestList[0].name}</Typography>
                    </Box>
                    <List>
                        <ListItem>
                            <RoomIcon style={{'paddingRight': '12px'}}/>
                            <ListItemText primary={nearestList[0].address} />
                        </ListItem>
                        <ListItem>
                            <ThumbsUpDownIcon style={{ color: (nearestList[0].score > 0.5) ? green[500] : red[500], 'paddingRight': '12px'}}/>
                            <ListItemText primary={buildRecommendString((nearestList[0] as unknown) as ILocationDetails)}/>
                        </ListItem>
                    </List>
                    <Divider />
                </Paper>
            </Box>
            
            <Box m={1} style={{'width': '100%'}}>
                <Paper variant='outlined'>
                    <LocationReviews reviews={nearestList[0].reviews as Array<ILocationReview>} />
                </Paper>
            </Box>
            
        </Box>
    )
}

export default LocationDetails;