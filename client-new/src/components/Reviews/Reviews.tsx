import { ListItem, ListItemIcon, ListItemText, Modal, Paper, Box, Typography } from "@material-ui/core";
import RateReviewIcon from '@material-ui/icons/RateReview';
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { selectLoggedInUser } from "../../features/user/UserSlice";


function Reviews() {
    const loggedInUser = useSelector(selectLoggedInUser);

    const [open, setOpen] = useState(false);

    const handleCancel = () => {
        setOpen(false);
    }

    let content;
    if (!loggedInUser) {
        return (
            <ListItem button component={Link} to='/login'>
                <ListItemIcon>
                    <RateReviewIcon />
                </ListItemIcon>
                <ListItemText primary='Your reviews' />
            </ListItem>
        );
    }

    return (
        <ListItem button component={Link} to='/reviews'>
            <ListItemIcon>
                <RateReviewIcon />
            </ListItemIcon>
            <ListItemText primary='Your reviews' />
            {content}
            <Modal
                open={open}
                onClose={handleCancel}
                style={{ display:'flex', alignItems:'center', justifyContent:'center' }}
            >
                <Paper>
                    <Box p={2}>
                        <Typography variant='h5' component='div'>Your reviews</Typography>
                    </Box>
                </Paper>
            </Modal> 
        </ListItem>
    );
}

export default Reviews;