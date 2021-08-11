import { Box, Typography, List, Divider } from "@material-ui/core";
import { ILocationReview } from "../../interfaces/ILocationReview";
import { Fragment } from 'react';
import LocationReview from "../LocationReview";

interface LocationReviewsProps {
    locationReviews: Array<ILocationReview>;
}

function LocationReviews(props: LocationReviewsProps) {
    return (
        <Box p={1}>
            <Typography align='left'>Recent reviews</Typography>
            <List>
                {
                   props.locationReviews.map((locationReview: ILocationReview, index) => (
                        <Fragment key={locationReview._id}>
                            <LocationReview locationReview={locationReview}/>
                            {(index + 1 === props.locationReviews.length) ? null : <Divider />}
                        </Fragment>
                    ))
                }
            </List>
        </Box>
    );
}

export default LocationReviews;