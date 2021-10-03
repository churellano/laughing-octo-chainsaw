import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Fragment } from "react";
import { LocationReview as LocationReviewType } from "../../interfaces/LocationReview";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface LocationReviewProps {
  locationReview: LocationReviewType;
}

function LocationReview({ locationReview }: LocationReviewProps) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{locationReview.user.username.split("")[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={locationReview.user.username}
        secondary={
          <Fragment>
            <Typography component="div" variant="body2" color="textSecondary">
              {dayjs().to(locationReview.postedDate)}
            </Typography>
            <Typography component="div" variant="body2" color="textPrimary">
              {locationReview.description}
            </Typography>
          </Fragment>
        }
      ></ListItemText>
    </ListItem>
  );
}

export default LocationReview;
