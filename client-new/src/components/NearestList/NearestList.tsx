import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { computeDistanceBetween } from 'spherical-geometry-js';
import { createStyles, makeStyles, Paper, Theme, useTheme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux';
import { selectLatLng, selectNearestLocationDetails } from '../../features/locationDetails/LocationDetailsSlice';
import { ILocationDetails } from '../../interfaces/ILocationDetails';
import NearestListItem from '../NearestListItem';
import Utility from '../../helpers/utility';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        overflowX: 'auto'
    },
    listItem: {
        cursor: 'pointer',
        minWidth: '12rem',
        paddingBottom: '1rem'
    },
    divider: {
        width: '100%'
    },
    name: {
        fontSize: '0.9rem'
    },
    rating: {
        display: 'flex',
        alignItems: 'center',
    }
  })
);

function NearestList() {
    const classes = useStyles();
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

    const nearestLocationDetails = useSelector(selectNearestLocationDetails);
    const currentLatLng = useSelector(selectLatLng);
    

    return (
        <Box style={{ width: '100%'}}>
            <Paper variant='outlined'>
                <Box p={1}>
                    <Typography variant='h6'>Nearest washrooms</Typography>
                </Box>
                <Divider className={classes.divider}/>
                <List className={classes.list} style={{ flexDirection: isLargeScreen ? 'column' : 'row' }}>
                    {
                        nearestLocationDetails.map((locationDetails: ILocationDetails, index: number) => (
                                <>
                                    <NearestListItem 
                                        locationDetails={locationDetails}
                                        distance={currentLatLng && computeDistanceBetween(currentLatLng, Utility.pointToLatLng(locationDetails.point)) / 1000} 
                                    />
                                    { 
                                        index + 1 < nearestLocationDetails.length && 
                                        <Divider 
                                            orientation={isLargeScreen ? 'horizontal' : 'vertical'}
                                            flexItem 
                                            style={{ 
                                                width: isLargeScreen ? 'auto' : '1px',
                                                height: isLargeScreen ? '1px' : 'auto'
                                            }} 
                                        />
                                    }
                                </>
                            )
                        )
                    }
                </List>
            </Paper>
        </Box>
    );
}

export default NearestList;