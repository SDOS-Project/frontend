import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';

export default function LoggedInRightCol({ logoutClickHandler, user }) {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  return (
    <Box className='hidden md:flex items-center gap-4'>
      <IconButton className='p-0' onClick={handleOpenUserMenu}>
        <Avatar>
          {user?.firstName[0]}
          {user?.lastName[0]}
        </Avatar>
      </IconButton>
      <Menu
        className='mt-10'
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Link href={`/user/${user?.handle}`} legacyBehavior>
          <MenuItem>
            <ListItemText textAlign='center'>Profile</ListItemText>
          </MenuItem>
        </Link>
        <MenuItem onClick={logoutClickHandler}>
          <ListItemText textAlign='center'>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
