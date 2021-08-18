import { Box, Button, Divider, Modal, Paper, Typography } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { useEffect } from "react";
import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLocationDetails } from "../../features/locationDetails/LocationDetailsSlice";

import {
    fetchLocationReviewsWithSkip,
    selectLocationReviews,
    selectLocationReviewsCount
} from '../../features/locationReview/LocationReviewSlice'
import { ILocationReview } from "../../interfaces/ILocationReview";
import LocationReview from "../LocationReview";

function LocationReviewsModal() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);

    const locationDetails = useSelector(selectLocationDetails);
    const locationReviews = useSelector(selectLocationReviews);
    const locationReviewsCount = useSelector(selectLocationReviewsCount);

    useEffect(() => {
        console.log(locationDetails, locationReviews, locationDetails && !locationReviews.length);
        if (locationDetails && !locationReviews.length) {
            dispatch(fetchLocationReviewsWithSkip({
                locationId: locationDetails._id,
                skip: (page - 1) * 5,
                limit: 5
            }));
        }
    }, [open, page, locationDetails])

    const handleCancel = () => {
        setOpen(false);
    }
    
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        if (locationDetails) {
            dispatch(fetchLocationReviewsWithSkip({
                locationId: locationDetails._id,
                skip: (value - 1) * 5,
                limit: 5
            }));
        }
    };

    const pagesCount = Math.ceil(locationReviewsCount / 5);

    return (
        <Fragment>
            <Box mb={2}>
                <Button onClick={() => { setOpen(true) }}>
                    View all
                </Button>
            </Box>
            <Modal
                open={open}
                onClose={handleCancel}
                style={{ display:'flex', alignItems:'center', justifyContent:'center' }}
            >
                <Paper>
                    <Box p={2}>
                        <Typography variant='h5' component='div'>All reviews</Typography>
                        {
                            locationReviews.map((locationReview: ILocationReview, index) => (
                                <Fragment key={locationReview._id}>
                                    <LocationReview locationReview={locationReview}/>
                                    {(index + 1 === locationReviews.length) ? null : <Divider />}
                                </Fragment>
                            ))
                        }
                        <Box justifyContent='center'>
                            <Pagination count={pagesCount} page={page} onChange={handleChange} />
                        </Box>
                    </Box>
                </Paper>
            </Modal>
        </Fragment>
        
    );
}

export default LocationReviewsModal;