import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { selectLoggedInUser } from '../../features/user/UserSlice';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavbarDrawer from '../NavbarDrawer';

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
      endContent = <Button color="inherit" component={Link} to='/login'>Login</Button>;
    }

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar variant="dense">
                <NavbarDrawer />
                <Typography className={classes.title} variant="h6" color="inherit" component={Link} to='/' style={{textDecoration: 'none'}}>GottaGo</Typography>
                {endContent}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;