import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from "@material-ui/core";
import { LocationReview } from "../../interfaces/LocationReview";
import { Fragment } from 'react';

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface LocationReviewsProps {
    reviews: Array<LocationReview>;
}

function LocationReviews(props: LocationReviewsProps) {
    return (
        <Box p={1}>
            <Typography align='left'>Recent reviews</Typography>
            <List>
                {
                   props.reviews.map((review: LocationReview, index) => (
                            <Fragment>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>{review.username.split('')[0]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={review.username}
                                        secondary={
                                            <Fragment>
                                                <Typography component="div" variant="body2" color="textSecondary">{dayjs().to(review.postedDate)}</Typography>
                                                <Typography component="div" variant="body2" color="textPrimary">{review.description}</Typography>
                                            </Fragment>
                                        }>
                                    </ListItemText>
                                </ListItem>
                                {/* Only place dividers between list items */}
                                {(index + 1 === props.reviews.length) ? null : <Divider />}
                            </Fragment>
                        ))
                }
            </List>
        </Box>
    );
}

export default LocationReviews;