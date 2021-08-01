import { useState } from "react";
import Login from '../Login';
import Signup from '../Signup';
import SwipeableViews from 'react-swipeable-views';
import { Box } from "@material-ui/core";

export interface LoginOrSignupProps {
    initialIndex: number
};

function LoginOrSignup({ initialIndex, ...props }: LoginOrSignupProps) {
    const [index, setIndex] = useState(initialIndex);

    const showSignUp = () => {
        setIndex(1);
        window.history.replaceState(null, '', '/signup');
    }

    const showLogin = () => {
        setIndex(0);
        window.history.replaceState(null, '', '/login');
    }

    return (
        <SwipeableViews index={index}>
            <Box p={4} display='inline-block'>
                <Login showSignup={showSignUp}/>
            </Box>
            <Box p={4} display='inline-block'>
                <Signup showLogin={showLogin}/>
            </Box>
        </SwipeableViews>
    );
}

export default LoginOrSignup;