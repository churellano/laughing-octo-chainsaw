import {
  Box,
  Button,
  CircularProgress,
  createStyles,
  Divider,
  makeStyles,
  Modal,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect } from "react";
import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLocationDetails } from "../../features/locationDetails/LocationDetailsSlice";

import {
  fetchLocationReviewsWithSkip,
  selectLocationReviews,
  selectLocationReviewsCount,
} from "../../features/locationReview/LocationReviewSlice";
import { LocationReview as LocationReviewType } from "../../interfaces/LocationReview";
import LocationReview from "../LocationReview";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalContent: {
      width: "50%",
    },
  })
);

function LocationReviewsModal() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const locationDetails = useSelector(selectLocationDetails);
  const locationReviews = useSelector(selectLocationReviews);
  const locationReviewsCount = useSelector(selectLocationReviewsCount);

  useEffect(() => {
    if (locationDetails && !locationReviews.length) {
      dispatch(
        fetchLocationReviewsWithSkip({
          locationId: locationDetails._id,
          skip: (page - 1) * 5,
          limit: 5,
        })
      );
    }
  }, [dispatch, open, page, locationDetails, locationReviews]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<any>, value: number) => {
    setPage(value);
    if (locationDetails) {
      dispatch(
        fetchLocationReviewsWithSkip({
          locationId: locationDetails._id,
          skip: (value - 1) * 5,
          limit: 5,
        })
      );
    }
  };

  const pagesCount = Math.ceil(locationReviewsCount / 5);

  const content = locationReviews.length ? (
    locationReviews.map((locationReview: LocationReviewType, index) => (
      <Fragment key={locationReview._id}>
        <LocationReview locationReview={locationReview} />
        {index + 1 === locationReviews.length ? null : <Divider />}
      </Fragment>
    ))
  ) : (
    <CircularProgress />
  );

  return (
    <Fragment>
      <Box mb={2}>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          View all
        </Button>
      </Box>
      <Modal className={classes.root} open={open} onClose={handleCancel}>
        <Paper className={classes.modalContent}>
          <Box p={2}>
            <Typography variant="h5" component="div">
              All reviews
            </Typography>
            {content}
            <Box justifyContent="center">
              <Pagination
                count={pagesCount}
                page={page}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Paper>
      </Modal>
    </Fragment>
  );
}

export default LocationReviewsModal;
