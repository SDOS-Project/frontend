'use client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import { useCallback, useMemo, useState } from 'react';
import { clearUser, selectUser } from '@/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase-config';
import { toast } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/store/store';

export default function Header() {
  const router = useRouter();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const navItems = useMemo(
    () => [
      { page: 'Recommended', href: '/recommended' },
      { page: 'Projects', href: '/project' },
      { page: 'Organisations', href: '/organisation' },
    ],
    []
  );

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const handleLogout = useCallback(async () => {
    try {
      await auth.signOut();
      dispatch(clearUser());
      router.push('/');
    } catch (error) {
      toast.error(error.message);
    }
  }, [dispatch, router]);

  const hrefCallback = useCallback(() => {
    const href = user?.role ? 'user' : 'organisation';
    console.log(href);
    return `/${href}/${user.handle}`;
  }, [user?.role, user?.handle]);

  const drawer = useMemo(
    () => (
      <Box
        onClick={handleDrawerToggle}
        className="h-full bg-white flex flex-col">
        {user.name ||
          (user.firstName && (
            <>
              <Box className="mt-4 flex flex-col gap-5 justify-center items-center">
                <Avatar className="w-24 h-24">
                  {user?.name ? (
                    <>{user?.name[0]}</>
                  ) : (
                    <>
                      {user?.firstName[0]}
                      {user?.lastName[0]}
                    </>
                  )}
                </Avatar>
                <Link href={hrefCallback()} legacyBehavior>
                  <Typography className="text-primary-main cursor-pointer body-large">
                    {user?.name ? (
                      <>{user?.name}</>
                    ) : (
                      <>
                        {user?.firstName} {user?.lastName}
                      </>
                    )}
                  </Typography>
                </Link>
              </Box>
              <Divider className="m-0 p-0 mt-6" />
            </>
          ))}
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
          <ListItem disablePadding>
            <ListItemButton className="text-center">
              <Link href={'/project/start'} legacyBehavior>
                <ListItemText primary={'Start a Project'} />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton className="text-center">
              <ListItemText onClick={handleLogout}>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    ),
    [
      handleDrawerToggle,
      handleLogout,
      hrefCallback,
      navItems,
      user?.firstName,
      user?.lastName,
      user?.name,
    ]
  );

  return (
    <PersistGate loading={null} persistor={persistor}>
      <AppBar color="grey" className="shadow-md px-2 sticky mb-5">
        <Toolbar className="flex items-center justify-between">
          <Box className="flex">
            <Link href={'/'} passHref={true} legacyBehavior>
              <Avatar
                alt="EduCorp Logo"
                src="/assets/logo.png"
                className="hover:cursor-pointer w-12 h-12"
              />
            </Link>
            <Box className="ml-4 hidden md:flex items-center gap-4">
              {navItems.map((item) => {
                return (
                  <Link href={item.href} key={item.href} legacyBehavior>
                    <Typography className="body-normal cursor-pointer transition all delay-30 hover:text-primary-main">
                      {item.page}
                    </Typography>
                  </Link>
                );
              })}
            </Box>
          </Box>
          <Box className="hidden md:flex items-center gap-4">
            {user?.role && (
              <Link href={'/project/start'} legacyBehavior>
                <Button
                  variant="contained"
                  className="bg-primary-main py-1 px-6">
                  Start a Project
                </Button>
              </Link>
            )}
            <IconButton className="p-0" onClick={handleOpenUserMenu}>
              <Avatar>
                {user?.firstName && user?.lastName ? (
                  <>
                    {user?.firstName[0]}
                    {user?.lastName[0]}
                  </>
                ) : (
                  user?.name[0]
                )}
              </Avatar>
            </IconButton>
            <Menu
              className="mt-10"
              id="menu-appbar"
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
              onClose={handleCloseUserMenu}>
              <Link href={hrefCallback()} legacyBehavior>
                <MenuItem>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
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
    </PersistGate>
  );
}
