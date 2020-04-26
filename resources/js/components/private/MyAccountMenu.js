import React from 'react';
import Button from '@material-ui/core/Button';
import { Link, NavLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

export default function MyAccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        size="small"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        My account
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem>
          <NavLink
            tag={Link}
            to="/logout"
          >
            Sign out
          </NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
}
