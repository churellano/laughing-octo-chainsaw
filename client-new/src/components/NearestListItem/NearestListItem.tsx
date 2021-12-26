import { useDispatch } from "react-redux";
import {
  setSelectedLatLng,
  setSelectedPlaceId,
} from "../../features/locationDetails/LocationDetailsSlice";
import { clearSelectedLocationReviews } from "../../features/locationReview/LocationReviewSlice";
import { LocationDetails } from "../../interfaces/LocationDetails";

import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import ListItem from "@material-ui/core/ListItem";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import {
  useTheme,
  useMediaQuery,
  Grid,
  Typography,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import Utility from "../../helpers/utility";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      cursor: "pointer",
      minWidth: "12rem",
      paddingBottom: "1rem",
    },
    name: {
      fontSize: "0.9rem",
    },
    rating: {
      display: "flex",
      alignItems: "center",
    },
  })
);

interface NearestListItemProps {
  locationDetails: LocationDetails;
  distance: number | null;
}

function NearestListItem({ locationDetails, distance }: NearestListItemProps) {
  const dispatch = useDispatch();

  const classes = useStyles();
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const truncateName = (name: string) =>
    name.length > 30 ? name.substring(0, 25) + "..." : name;

  const handleClick = (locationDetails: LocationDetails) => {
    dispatch(setSelectedPlaceId(locationDetails.placeId));
    dispatch(
      setSelectedLatLng(Utility.pointToLatLngLiteral(locationDetails.point))
    );
    dispatch(clearSelectedLocationReviews());
  };

  return (
    <ListItem
      className={classes.listItem}
      alignItems="center"
      style={{ height: largeScreen ? "100%" : "6rem" }}
      onClick={() => handleClick(locationDetails)}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        style={{ height: "100%" }}
      >
        <Grid item>
          <Typography className={classes.name} variant="h6">
            {truncateName(locationDetails.name)}
          </Typography>
        </Grid>
        <Grid item container direction="row" justifyContent="space-between">
          <span>{distance && distance.toFixed(2)} km</span>
          <div className={classes.rating}>
            <span>
              {Utility.decimalToPercent(
                Utility.calculateScore(
                  locationDetails.upvotes,
                  locationDetails.downvotes
                )
              )}
              %
            </span>
            {Utility.calculateScore(
              locationDetails.upvotes,
              locationDetails.downvotes
            ) > 0.5 ? (
              <ThumbUpIcon fontSize="small" style={{ color: green[500] }} />
            ) : (
              <ThumbDownIcon fontSize="small" style={{ color: red[500] }} />
            )}
          </div>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default NearestListItem;
