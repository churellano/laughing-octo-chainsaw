import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { computeDistanceBetween } from "spherical-geometry-js";
import {
  CircularProgress,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  useTheme,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { useSelector } from "react-redux";
import {
  selectLatLng,
  selectNearestLocationDetails,
  selectNearestLocationDetailsStatus,
} from "../../features/locationDetails/LocationDetailsSlice";
import { LocationDetails } from "../../interfaces/LocationDetails";
import NearestListItem from "../NearestListItem";
import Utility from "../../helpers/utility";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: 0,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      overflowX: "auto",
    },
    listItem: {
      cursor: "pointer",
      minWidth: "12rem",
      paddingBottom: "1rem",
    },
    divider: {
      width: "100%",
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

function NearestList() {
  const classes = useStyles();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const nearestLocationDetails = useSelector(selectNearestLocationDetails);
  const nearestLocationDetailsStatus = useSelector(
    selectNearestLocationDetailsStatus
  );
  const currentLatLng = useSelector(selectLatLng);

  let content;
  if (nearestLocationDetails.length) {
    content = (
      <List
        className={classes.list}
        style={{ flexDirection: isLargeScreen ? "column" : "row" }}
      >
        {nearestLocationDetails.map(
          (locationDetails: LocationDetails, index: number) => (
            <>
              <NearestListItem
                locationDetails={locationDetails}
                distance={
                  currentLatLng &&
                  computeDistanceBetween(
                    currentLatLng,
                    Utility.pointToLatLng(locationDetails.point)
                  ) / 1000
                }
              />
              {index + 1 < nearestLocationDetails.length && (
                <Divider
                  orientation={isLargeScreen ? "horizontal" : "vertical"}
                  flexItem
                  style={{
                    width: isLargeScreen ? "auto" : "1px",
                    height: isLargeScreen ? "1px" : "auto",
                  }}
                />
              )}
            </>
          )
        )}
      </List>
    );
  } else if (
    nearestLocationDetailsStatus === "succeeded" &&
    !nearestLocationDetails.length
  ) {
    content = (
      <Typography variant="body1">
        No locations were found in this area.
      </Typography>
    );
  } else if (
    nearestLocationDetailsStatus === "loading" &&
    navigator.geolocation
  ) {
    content = <CircularProgress />;
  }

  return (
    <Box style={{ width: "100%" }}>
      <Paper variant="outlined">
        <Box p={1}>
          <Typography variant="h6">Nearest washrooms</Typography>
        </Box>
        <Divider className={classes.divider} />
        {content}
      </Paper>
    </Box>
  );
}

export default NearestList;
