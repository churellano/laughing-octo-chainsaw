import { Box, Typography, List, Divider } from "@material-ui/core";
import { LocationReview as LocationReviewType } from "../../interfaces/LocationReview";
import { Fragment } from "react";
import LocationReview from "../LocationReview";
import LocationReviewsModal from "../LocationReviewsModal";

interface LocationReviewsProps {
  locationReviews: Array<LocationReviewType>;
}

function LocationReviews(props: LocationReviewsProps) {
  return (
    <Box p={1}>
      <Typography align="left">Recent reviews</Typography>
      <List>
        {props.locationReviews.map(
          (locationReview: LocationReviewType, index) => (
            <Fragment key={locationReview._id}>
              <LocationReview locationReview={locationReview} />
              {index + 1 === props.locationReviews.length ? null : <Divider />}
            </Fragment>
          )
        )}
      </List>
      <LocationReviewsModal />
    </Box>
  );
}

export default LocationReviews;
