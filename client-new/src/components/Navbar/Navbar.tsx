import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { selectLoggedInUser } from '../../features/user/UserSlice';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

function Navbar() {
    const classes = useStyles();

    const loggedInUser = useSelector(selectLoggedInUser);

    let endContent;
    if (loggedInUser) {
      endContent = <Typography variant="h6" color="inherit">Hello, {loggedInUser.username}</Typography>;
    } else {
      endContent = <Button color="inherit" href="/login">Login</Button>;
    }

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar variant="dense">
                <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" color="inherit">GottaGo</Typography>
                {endContent}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;