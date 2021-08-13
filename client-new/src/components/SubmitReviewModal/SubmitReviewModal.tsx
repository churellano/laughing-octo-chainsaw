import { useState, Fragment } from 'react';
import { Box, Button, Divider, IconButton, Modal, Paper, TextField, Typography } from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import { submitLocationReview } from '../../features/locationReview/LocationReviewSlice';
import { ILocationReview } from '../../interfaces/ILocationReview';
import { selectLoggedInUser } from '../../features/user/UserSlice';
import { ILocationDetails } from '../../interfaces/ILocationDetails';
import { selectLatLng } from '../../features/locationDetails/LocationDetailsSlice';

interface SubmitReviewModalProps {
    id: string | null;
    placeId: string;
    name: string;
    address: string;
}

const renderRecommendationButtons = (recommendLocation: boolean | null) => {
    let thumbUpIcon;
    let thumbDownIcon;
    if (recommendLocation === null) {
        thumbUpIcon = <ThumbUpIcon />;
        thumbDownIcon = <ThumbDownIcon />;
    } else if (recommendLocation) {
        thumbUpIcon = <ThumbUpIcon style={{ color: green[500] }}/>;
        thumbDownIcon = <ThumbDownIcon />;
    } else if (!recommendLocation) {
        thumbUpIcon = <ThumbUpIcon />;
        thumbDownIcon = <ThumbDownIcon style={{ color: red[500] }}/>;
    }
    
    return [thumbUpIcon, thumbDownIcon];
}

function SubmitReviewModal(props: SubmitReviewModalProps) {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [recommend, setRecommend] = useState<boolean | null>(null);
    const [description, setDescription] = useState<string>('');

    const loggedInUser = useSelector(selectLoggedInUser);

    const [thumbUpIcon, thumbDownIcon] = renderRecommendationButtons(recommend);
    const selectedLatLng = useSelector(selectLatLng);

    const handleCancel = () => {
        console.log('handlecancel')
        setRecommend(null);
        setDescription('');
        setOpen(false);
    }

    const allowSubmit = () => recommend !== null && description;

    const handleSubmit = () => {
        let locationDetails;
        if (props.id) {
            locationDetails = {
                _id: props.id,
            };
        } else {
            if (selectedLatLng) {
                locationDetails = {
                    _id: null,
                    placeId: props.placeId,
                    name: props.name,
                    address: props.address,
                    point: {
                        type: 'Point',
                        coordinates: [selectedLatLng.lng(), selectedLatLng.lat()]
                    }
                };
            }
        }

        const locationReview = {
            locationDetails: locationDetails as ILocationDetails,
            user: loggedInUser,
            recommend,
            description
        } as ILocationReview;

        console.log('handleSubmit', locationReview);
        dispatch(submitLocationReview(locationReview))
        setOpen(false);
    };

    const renderLoginPrompt = () => (
        <Fragment>
            <Typography variant='h5' component='div'>Sign in to write a review.</Typography>
            <Box mt={2} mb={2}>
                <Divider />
            </Box>
            <Button variant="contained" color="primary" href="/login">Login</Button>
        </Fragment>
    )

    const renderReviewForm = () => (
        <Fragment>
            <Typography variant='h5' component='div'>Reviewing</Typography>
            <Typography variant='h3' component='div'>{props.name}</Typography>

            <Box display='flex' justifyContent='center' m={2}>
                <IconButton onClick={() => setRecommend(true)}>
                    {thumbUpIcon}
                </IconButton>
                <IconButton onClick={() => setRecommend(false)}>
                    {thumbDownIcon}
                </IconButton>
            </Box>
            
            <Box m={2}>
                <TextField
                    fullWidth
                    placeholder="Share your experience with this washroom"
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={e => setDescription(e.target.value)}
                />
            </Box>
            
            <Box display="flex" justifyContent='flex-end' m={2}>
                <Box mr={2}>
                    <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                </Box>
                <Button variant="contained" color="primary" disabled={!allowSubmit()} onClick={handleSubmit}>Submit</Button>
            </Box>
        </Fragment>
    );

    let content;
    if (loggedInUser) {
        content = renderReviewForm();
    } else {
        content = renderLoginPrompt();
    }

    return (
        <Fragment>
            <Box mb={2}>
                <Button variant="contained" color="primary" onClick={() => { setOpen(true) }}>
                    Write a review
                </Button>
            </Box>
            <Modal
                open={open}
                onClose={handleCancel}
                style={{ display:'flex', alignItems:'center', justifyContent:'center' }}
            >
                <Paper>
                    <Box p={2}>
                        {content}
                    </Box>
                </Paper>
            </Modal>
        </Fragment>
        
    );
}

export default SubmitReviewModal;