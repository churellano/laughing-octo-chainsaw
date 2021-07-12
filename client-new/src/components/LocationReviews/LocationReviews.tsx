import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from "@material-ui/core";
import { ILocationReview } from "../../interfaces/ILocationReview";
import { Fragment } from 'react';

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface LocationReviewsProps {
    reviews: Array<ILocationReview>;
}

function LocationReviews(props: LocationReviewsProps) {
    return (
        <Box p={1}>
            <Typography align='left'>Recent reviews</Typography>
            <List>
                {
                   props.reviews.map((review: ILocationReview, index) => (
                            <Fragment key={review.locationId}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>{review.user.username.split('')[0]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={review.user.username}
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