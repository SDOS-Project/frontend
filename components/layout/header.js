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
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase-config';
import { toast } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/store/store';
import LoggedInRightCol from './LoggedInRightCol';

function Header() {
  const router = useRouter();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  const navItems = useMemo(
    () => [
      { page: 'Recommended', href: '/recommended' },
      { page: 'Projects', href: '/projects' },
      { page: 'Organisations', href: '/organisation' },
    ],
    []
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = useCallback(async () => {
    try {
      await auth.signOut();
      dispatch(clearUser());
      router.push('/');
    } catch (error) {
      toast.error(error.message);
    }
  }, [dispatch, router]);

  const drawer = (
    <Box onClick={handleDrawerToggle} className='h-full bg-white flex flex-col'>
      {user && (
        <>
          <Box className='mt-5 flex flex-col gap-5 justify-center items-center'>
            <Avatar className='w-20 h-20'>
              {user?.firstName[0]}
              {user?.lastName[0]}
            </Avatar>
            <Link href={`/${user?.base}/${user?.handle}`} legacyBehavior>
              <Typography className='text-primary-main text-md cursor-pointer text-center'>
                {user?.name}
              </Typography>
            </Link>
          </Box>
          <Divider className='m-0 p-0 mt-4' />
        </>
      )}
      <List>
        {navItems.map((item) => {
          return (
            <ListItem key={item.href} disablePadding>
              <ListItemButton className='text-center'>
                <Link href={item.href} legacyBehavior>
                  <ListItemText primary={item.page} />
                </Link>
              </ListItemButton>
            </ListItem>
          );
        })}
        <ListItem disablePadding>
          <ListItemButton className='text-center'>
            <ListItemText onClick={handleLogout}>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <PersistGate loading={null} persistor={persistor}>
      <AppBar
        component='nav'
        color='transparent'
        className='bg-gg shadow-md sticky'
      >
        <Toolbar className='flex items-center justify-between'>
          <Box className='flex'>
            <Link href={'/'} passHref={true} legacyBehavior>
              SDOS
            </Link>
            <Box className='ml-4 hidden md:flex items-center gap-4'>
              {navItems.map((item) => {
                return (
                  <Link href={item.href} key={item.href} legacyBehavior>
                    <Typography className='body-normal  cursor-pointer transition all delay-30 hover:text-primary-main'>
                      {item.page}
                    </Typography>
                  </Link>
                );
              })}
            </Box>
          </Box>
          <Box className='hidden md:flex items-center gap-4'>
            <LoggedInRightCol handleLogout={handleLogout} user={user} />
          </Box>
          <Box className='md:hidden'>
            <IconButton
              className='md:hidden'
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
            >
              <MenuIcon className='text-black' />
            </IconButton>
          </Box>
        </Toolbar>
        <Drawer
          anchor='right'
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </PersistGate>
  );
}
export default Header;
