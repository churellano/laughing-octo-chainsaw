import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ClearIcon from "@material-ui/icons/Clear";
import Reviews from "../Reviews";

function NavbarDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box display="flex" justifyContent="space-around">
          <Box display="flex" alignItems="center">
            <Typography variant="h6" color="inherit">
              GottaGo
            </Typography>
          </Box>
          <IconButton
            color="inherit"
            edge="end"
            aria-label="menu"
            onClick={toggleDrawer(false)}
          >
            <ClearIcon />
          </IconButton>
        </Box>
        <List>
          <Reviews />
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default NavbarDrawer;
