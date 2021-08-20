import React, { useState } from "react";
import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ClearIcon from '@material-ui/icons/Clear';
import { Link } from "react-router-dom";
import Reviews from "../Reviews";

function NavbarDrawer() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (
      event: React.KeyboardEvent | React.MouseEvent,
    ) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
  
      setOpen(open);
    };

    return (
        <>
            <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon onClick={toggleDrawer(true)}/>
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box display='flex' justifyContent='space-around'>
                    <Box display='flex' alignItems='center'>
                        <Typography variant="h6" color="inherit">GottaGo</Typography>
                    </Box>
                    <IconButton color="inherit" edge='end' aria-label="menu">
                        <ClearIcon onClick={toggleDrawer(false)}/>
                    </IconButton>
                </Box>
                <List>
                <ListItem button component={Link} to='/reviews'>
                    <ListItemIcon>
                        <RateReviewIcon />
                    </ListItemIcon>
                    <ListItemText primary='Your reviews' />
                </ListItem>
                <ListItem button component={Link} to='/account'>
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary='Account' />
                </ListItem>
                </List>
            </Drawer>
        </>
    );
}

export default NavbarDrawer;