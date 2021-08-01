import { Box, Paper, Typography, TextField, Button } from "@material-ui/core";
import RateReviewIcon from '@material-ui/icons/RateReview';
import { ChangeEvent, useState } from "react";
import { debounce } from "debounce";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import UserAPI from '../../api/User';
import signup from '../../features/user/UserSlice';
import isEmail from 'validator/lib/isEmail';
import { useEffect } from "react";

interface ISignupProps {
    showLogin: () => void
};

interface ISignupState {
    email: string;
    username: string;
    password: string;
    isEmailTouched: boolean;
    isEmailAvailable: boolean;
    isUsernameTouched: boolean;
    isUsernameAvailable: boolean;
    showPassword: boolean;
};

function Signup({ showLogin }: ISignupProps) {
    const [values, setValues] = useState<ISignupState>({
        email: '',
        username: '',
        password: '',
        isEmailTouched: false,
        isEmailAvailable: false,
        isUsernameTouched: false,
        isUsernameAvailable: false,
        showPassword: false
    });

    const handleChange = (prop: keyof ISignupState) => async (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        await setValues({ ...values, [prop]: event.target.value });
        switch(prop) {
            case 'email':
                handleSetEmail(event.target.value);
                break;
            case 'username':
                handleSetUsername(event.target.value);
                break;
        }
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const isEmailValid = () => {
        return isEmail(values.email) && values.isEmailAvailable;
    }

    const createEmailErrorMessage = () => {
        let errorMessage = "";
        if (values.email && values.email.length > 0 && !isEmail(values.email)) {
            errorMessage = "Invalid email format.";
        } else if (values.email && values.email.length && !values.isEmailAvailable) {
            errorMessage = "Email not available."
        }
        return errorMessage;
    }

    const isUsernameValid = () => {
        return values.username && values.username.length && values.isUsernameAvailable;
    }

    const createUsernameErrorMessage = () => {
        let errorMessage = "";
        if (values.username.length && !values.isUsernameAvailable) {
            errorMessage = "Username not available.";
        }
        return errorMessage;
    }

    const handleSignup = () => {
        console.log('signing up with values: ', values);
        // dispatch(signup())
    }
    
    const handleSetEmail = debounce(async (email: string) => {
        if (isEmail(email)) {
            const isEmailAvailable = await UserAPI.isEmailAvailable(email);
            setValues({...values, isEmailAvailable});
        }
    }, 300);

    const handleSetUsername = debounce(async (username: string) => {
        if (username && username.length) {
            const isUsernameAvailable = await UserAPI.isUsernameAvailable(username);
            setValues({...values, isUsernameAvailable});
        }
    }, 300);

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
                        error={values.isEmailTouched && !isEmailValid()}
                        helperText={values.isEmailTouched && createEmailErrorMessage()}
                        onChange={handleChange('email')}
                        onFocus={() => setValues({...values, isEmailTouched: true})}
                    />
                </Box>
                <Box m={2}>
                    <TextField
                        required
                        fullWidth
                        label="Desired username"
                        variant="outlined"
                        error={values.isUsernameTouched && !isUsernameValid()}
                        helperText={values.isUsernameTouched && createUsernameErrorMessage()}
                        onChange={handleChange('username')}
                        onFocus={() => setValues({...values, isUsernameTouched: true})}
                    />
                </Box>
                <Box m={2}>
                    <TextField
                        required
                        fullWidth
                        label="Password"
                        type={values.showPassword ? 'text' : 'password'}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        onChange={handleChange('password')}
                    />
                </Box>
            </Box>

            <Box p={2} display='flex' justifyContent='space-between'>
                <Button color='primary' onClick={showLogin}>Sign in instead</Button>
                <Button variant='contained' color='primary' onClick={handleSignup}>Sign up</Button>
            </Box>
            
        </Paper>
    )
}

export default Signup;