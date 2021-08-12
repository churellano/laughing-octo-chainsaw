import { Box, Paper, Typography, TextField, Button } from "@material-ui/core";
import RateReviewIcon from '@material-ui/icons/RateReview';
import { useState } from "react";
import { debounce } from "debounce";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import UserAPI from '../../api/User';
import { selectLoggedInUser, signup } from '../../features/user/UserSlice';
import isEmail from 'validator/lib/isEmail';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

interface ISignupProps {
    showLogin: () => void
};

function Signup({ showLogin }: ISignupProps) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
    const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);
    const [isUsernameTouched, setIsUsernameTouched] = useState<boolean>(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const loggedInUser = useSelector(selectLoggedInUser);

    const isEmailValid = () => isEmail(email) && isEmailAvailable;

    const createEmailErrorMessage = () => {
        let errorMessage = "";
        if (email && email.length > 0 && !isEmail(email)) {
            errorMessage = "Invalid email format.";
        } else if (email && email.length && isEmailAvailable !== null && !isEmailAvailable) {
            errorMessage = "Email not available."
        }
        return errorMessage;
    }

    const isUsernameValid = () => username && username.length && isUsernameAvailable;

    const createUsernameErrorMessage = () => {
        let errorMessage = "";
        if (username.length && isUsernameAvailable !== null && !isUsernameAvailable) {
            errorMessage = "Username not available.";
        }
        return errorMessage;
    }

    const handleSignup = () => {
        console.log('signing up with values: ', email, username, password);
        dispatch(signup({ email, username, password }));
    }
    
    const handleSetEmail = (email: string) => {
        setEmail(email);
        checkEmailAvailability(email);
    };

    const checkEmailAvailability = debounce(async (email: string) => {
        if (isEmail(email)) {
            const isEmailAvailable = await UserAPI.isEmailAvailable(email);
            setIsEmailAvailable(isEmailAvailable);
        }
    }, 300);

    const handleSetUsername = (username: string) => {
        setUsername(username);
        checkUsernameAvailability(username);
    };

    const checkUsernameAvailability = debounce(async (username: string) => {
        if (username && username.length) {
            const isUsernameAvailable = await UserAPI.isUsernameAvailable(username);
            // setValues({...values, isUsernameAvailable});
            setIsUsernameAvailable(isUsernameAvailable);
        }
    }, 300);

    const canSubmit = () => {
        const isEmailValid = isEmail(email) && isEmailAvailable;
        const isUsernameValid = username && isUsernameAvailable;
        const isPasswordValid = true // TODO

        return isEmailValid && isUsernameValid && isPasswordValid;
    }

    if (loggedInUser) {
        return <Redirect to="/" />
    }

    return (
        <Paper variant='outlined'>
            <Box p={2}>
                <RateReviewIcon />
                <Typography variant='h5' component='div'>Sign up</Typography>
                <Typography variant='body1' component='div'>to share your experiences</Typography>
            </Box>

            <Box p={2}>
                <Box m={2}>
                    <TextField
                        required
                        fullWidth
                        label="Email"
                        variant="outlined"
                        error={isEmailTouched && !isEmailValid()}
                        helperText={isEmailTouched && createEmailErrorMessage()}
                        onChange={e => handleSetEmail(e.target.value)}
                        onBlur={() => setIsEmailTouched(true)}
                    />
                </Box>
                <Box m={2}>
                    <TextField
                        required
                        fullWidth
                        label="Desired username"
                        variant="outlined"
                        error={isUsernameTouched && !isUsernameValid()}
                        helperText={isUsernameTouched && createUsernameErrorMessage()}
                        onChange={e => handleSetUsername(e.target.value)}
                        onBlur={() => setIsUsernameTouched(true)}
                    />
                </Box>
                <Box m={2}>
                    <TextField
                        required
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Box>
            </Box>

            <Box p={2} display='flex' justifyContent='space-between'>
                <Button color='primary' onClick={showLogin}>Sign in instead</Button>
                <Button variant='contained' color='primary' onClick={handleSignup} disabled={!canSubmit()}>Sign up</Button>
            </Box>
            
        </Paper>
    )
}

export default Signup;