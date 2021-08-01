import { useState, Fragment, useCallback } from 'react';
import { Box, Button, IconButton, Modal, Paper, TextField, Typography } from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';


interface SubmitReviewModalProps {
    locationName: string;
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

const submitReview = () => {
    console.log('submitReview');
}

function SubmitReviewModal(props: SubmitReviewModalProps) {
    const [open, setOpen] = useState(false);
    const [recommendLocation, setRecommendLocation] = useState<boolean | null>(null);
    const [thumbUpIcon, thumbDownIcon] = renderRecommendationButtons(recommendLocation);

    const handleSubmit = useCallback(() => {
        setOpen(false);
        submitReview();
    }, []);

    return (
        <Fragment>
            <Box mb={2}>
                <Button variant="contained" color="primary" onClick={() => { setOpen(true) }}>
                    Write a review
                </Button>
            </Box>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                style={{ display:'flex', alignItems:'center', justifyContent:'center' }}
            >
                <Paper>
                    <Box p={2}>
                        <Typography variant='h5' component='div'>Reviewing</Typography>
                        <Typography variant='h3' component='div'>{props.locationName}</Typography>

                        <Box display='flex' justifyContent='center' m={2}>
                            <IconButton onClick={() => setRecommendLocation(true)}>
                                {thumbUpIcon}
                            </IconButton>
                            <IconButton onClick={() => setRecommendLocation(false)}>
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
                            />
                        </Box>
                        
                        <Box display="flex" justifyContent='flex-end' m={2}>
                            <Box mr={2}>
                                <Button variant="contained" onClick={() => setOpen(false)}>Cancel</Button>
                            </Box>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                        </Box>
                    </Box>
                </Paper>
            </Modal>
        </Fragment>
        
    );
}

export default SubmitReviewModal;