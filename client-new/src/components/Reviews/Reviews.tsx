import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  Box,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { Pagination } from "@material-ui/lab";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchLocationReviewsByUsernameWithSkip,
  selectLocationReviews,
  selectLocationReviewsCount,
} from "../../features/locationReview/LocationReviewSlice";
import { selectLoggedInUser } from "../../features/user/UserSlice";
import { LocationReview as LocationReviewType } from "../../interfaces/LocationReview";
import LocationReview from "../LocationReview";

function Reviews() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const loggedInUser = useSelector(selectLoggedInUser);
  const locationReviews = useSelector(selectLocationReviews);
  const locationReviewsCount = useSelector(selectLocationReviewsCount);

  useEffect(() => {
    if (loggedInUser && loggedInUser.username && !locationReviews.length) {
      dispatch(
        fetchLocationReviewsByUsernameWithSkip({
          username: loggedInUser.username,
          skip: (page - 1) * 5,
          limit: 5,
        })
      );
    }
  }, [dispatch, open, page, loggedInUser, locationReviews.length]);

  const handleChange = (event: React.ChangeEvent<any>, value: number) => {
    setPage(value);
    if (loggedInUser && loggedInUser.username) {
      dispatch(
        fetchLocationReviewsByUsernameWithSkip({
          username: loggedInUser.username,
          skip: (page - 1) * 5,
          limit: 5,
        })
      );
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (!loggedInUser) {
    return (
      <ListItem button component={Link} to="/login">
        <ListItemIcon>
          <RateReviewIcon />
        </ListItemIcon>
        <ListItemText primary="Your reviews" />
      </ListItem>
    );
  }

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
    <ListItem
      button
      onClick={() => {
        setOpen(true);
      }}
    >
      <ListItemIcon>
        <RateReviewIcon />
      </ListItemIcon>
      <ListItemText primary="Your reviews" />
      <Modal
        open={open}
        onClose={handleCancel}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper>
          <Box p={2}>
            <Typography variant="h5" component="div">
              Your reviews
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
    </ListItem>
  );
}

export default Reviews;
