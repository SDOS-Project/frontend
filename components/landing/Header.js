'use client';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { page: 'Login', href: '/login' },
      { page: 'Signup', href: '/signup/user' },
    ],
    []
  );

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const drawer = useMemo(
    () => (
      <Box
        onClick={handleDrawerToggle}
        className="h-full bg-white flex flex-col">
        <List>
          {navItems.map((item) => {
            return (
              <ListItem key={item.href} disablePadding>
                <ListItemButton className="text-center">
                  <Link href={item.href} legacyBehavior>
                    <ListItemText primary={item.page} />
                  </Link>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    ),
    [handleDrawerToggle, navItems]
  );

  return (
    <AppBar color="grey" className="shadow-md px-2 sticky">
      <Toolbar className="flex items-center justify-between">
        <Box className="flex">
          <Link href={'/'} passHref={true} legacyBehavior>
            <Avatar
              alt="EduCorp Logo"
              src="/assets/logo.png"
              className="hover:cursor-pointer w-12 h-12"
            />
          </Link>
        </Box>
        <Box className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href} legacyBehavior>
              <Typography className="body-normal cursor-pointer transition all delay-30 hover:text-primary-main">
                {item.page}
              </Typography>
            </Link>
          ))}
        </Box>
        <Box className="md:hidden">
          <IconButton
            className="md:hidden"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}>
            <MenuIcon className="text-black" />
          </IconButton>
        </Box>
      </Toolbar>
      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
          },
        }}>
        {drawer}
      </Drawer>
    </AppBar>
  );
}
