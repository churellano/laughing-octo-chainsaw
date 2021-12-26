import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Tooltip,
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
  const date = new Date(locationReview.postedDate);
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{locationReview.user.username.split("")[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={locationReview.user.username}
        secondary={
          <Fragment>
            <Tooltip title={date.toString()}>
              <Typography component="div" variant="body2" color="textSecondary">
                {dayjs().to(date)}
              </Typography>
            </Tooltip>
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
