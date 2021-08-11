 import { Box, Button, Paper, TextField, Typography } from "@material-ui/core";
import RateReviewIcon from '@material-ui/icons/RateReview';
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login, selectLoggedInUser } from "../../features/user/UserSlice";

interface LoginProps {
    showSignup: () => void
};

function Login({ showSignup }: LoginProps) {
    const dispatch = useDispatch();

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const loggedInUser = useSelector(selectLoggedInUser);

    const handleLogin = () => {
        dispatch(login({ identifier, password }));
    }

    if (loggedInUser) {
        return <Redirect to="/" />
    }

    return (
        <Paper variant='outlined'>
            <Box p={2}>
                <RateReviewIcon />
                <Typography variant='h5' component='div'>Sign in</Typography>
                <Typography variant='body1' component='div'>to write reviews</Typography>
            </Box>

            <Box p={2}>
                <Box m={2}>
                    <TextField
                        required
                        label="Email or username"
                        variant="outlined"
                        onChange={e => setIdentifier(e.target.value)}
                    />
                </Box>
                <Box m={2}>
                    <TextField
                        required
                        label="Password"
                        type="password"
                        variant="outlined"
                        onChange={e => setPassword(e.target.value)}
                    />
                </Box>
            </Box>

            <Box p={2} display='flex' justifyContent='space-between'>
                <Button color='primary' onClick={showSignup}>New user</Button>
                <Button variant='contained' color='primary' onClick={handleLogin}>Login</Button>
            </Box>
        </Paper>
    )
}

export default Login;