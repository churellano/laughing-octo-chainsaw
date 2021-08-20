import { createStyles, Grid, makeStyles, Theme, useTheme } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MapContainer from '../MapContainer';
import NearestList from '../NearestList';
import LocationDetails from '../LocationDetails';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2)
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

function MainContent() {
    const classes = useStyles();
    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <div className={classes.root}>
          <Grid container spacing={2} direction={largeScreen ? "row":  "column"}>
            <Grid item sm={12} md={3} style={{ maxWidth: '100%'}}>
                <NearestList />
            </Grid>
            <Grid item sm={12} md={6}>
                <MapContainer />
            </Grid>
            <Grid item sm={12} md={3}>
                <LocationDetails />
            </Grid>
          </Grid>
        </div>
      );
}

export default MainContent;