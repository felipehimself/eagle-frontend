import { MENU_ROUTES } from '@/constants/menu-routes';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import React, { useMemo, useState } from 'react';
import { NavListItem } from './elements/nav-list-item';

import {
  AppBar,
  Avatar,
  Button,
  Collapse,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  useTheme,
} from '@mui/material';

import { useUserSession } from '@/hooks/use-user-session';
import { useNavigate } from 'react-router-dom';
import { Drawer } from './elements/drawer';
import type { TDrawerOptions } from './types/drawer.types';

export const AppDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { clearSession } = useUserSession();

  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [drawerWidth, setDrawerWidth] = useState<'3rem' | '15rem'>('15rem');

  const handleDrawerWidth = () => {
    setDrawerWidth((prev) => {
      if (prev === '15rem') {
        return '3rem';
      }

      return '15rem';
    });

    setExpandedItems([]);
  };

  const session = useUserSession();

  const userInfo = useMemo(() => {
    const userSession = session.getSession();
    const name = userSession?.nome || '';
    const email = userSession?.email || '';
    const avatar = name.charAt(0).toUpperCase();

    return {
      name,
      email,
      avatar,
    };
  }, [session]);

  const handleExpandClick = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
  };

  const visibility = useMemo(() => {
    return drawerWidth === '3rem' ? 'hidden' : 'visible';
  }, [drawerWidth]);

  const renderMenuItem = (
    item: TDrawerOptions,
    level = 0,
    isChildren = false,
  ) => {
    const isExpanded = expandedItems.includes(item.id!);
    const isSelected = selectedItem === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const Icon = item.icon;

    return (
      <React.Fragment key={item.id}>
        <ListItem disablePadding sx={{ overflowX: 'hidden' }}>
          <ListItemButton
            onClick={() => {
              if (hasChildren) {
                if (drawerWidth === '3rem') return;
                handleExpandClick(item.id);
              } else {
                handleItemClick(item.id!);
              }
            }}
            selected={isSelected}
            sx={{
              pl: 6 + level * 2,
              paddingRight: 10 + level * 2,
              py: 0,
              '&.Mui-selected': {
                backgroundColor: !isChildren
                  ? 'rgba(25, 118, 210, 0.08)'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                },
              },
            }}
          >
            {!isChildren && (
              <Tooltip
                title={drawerWidth === '3rem' ? item.label : ''}
                placement='right-start'
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isSelected ? 'primary.main' : 'text.secondary',
                    marginRight: -4,
                  }}
                >
                  <Icon fontSize='small' />
                </ListItemIcon>
              </Tooltip>
            )}
            {!isChildren ? (
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: level === 0 ? '0.9rem' : '0.875rem',
                    fontWeight: level === 0 ? 400 : 300,
                    color: isSelected ? 'primary.main' : '#52595F',
                    visibility: visibility,
                  },
                }}
              />
            ) : (
              <NavListItem label={item.label} to={item.to} />
            )}
            {hasChildren && (
              <Box sx={{ color: 'text.secondary', marginRight: -3, pt: 2 }}>
                {isExpanded ? (
                  <KeyboardArrowUpIcon
                    sx={{ visibility: visibility }}
                    fontSize='small'
                  />
                ) : (
                  <KeyboardArrowDownIcon
                    sx={{ visibility: visibility }}
                    fontSize='small'
                  />
                )}
              </Box>
            )}
          </ListItemButton>
        </ListItem>
        {hasChildren && (
          <Collapse in={isExpanded} timeout='auto' unmountOnExit>
            <List
              sx={{ marginTop: 1, marginBottom: 1 }}
              component='div'
              disablePadding
            >
              {item.children?.map((child) =>
                renderMenuItem(child, level + 1, true),
              )}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ pt: 0, overflowY: 'auto' }}>
          {(MENU_ROUTES as TDrawerOptions[]).map((item) =>
            renderMenuItem(item),
          )}
        </List>
      </Box>
    </Box>
  );

  const handleLogout = () => {
    clearSession();
    reloadPage();
  };

  const reloadPage = () => {
    navigate('/app/home');
    window.location.href = '/';
  };

  return (
    <Box sx={{ display: 'flex', gap: theme.spacing(5) }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          sx={{
            minHeight: '48px !important',
          }}
        >
          <Stack
            direction='row'
            sx={{ width: '100%' }}
            justifyContent='space-between'
            alignItems='center'
            pl={4}
            pr={4}
          >
            <Stack direction='row' alignItems='center' spacing={4} ml='-10px'>
              <IconButton
                onClick={handleDrawerWidth}
                aria-label='abrir menus'
                edge='start'
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Stack
                sx={{ cursor: 'pointer' }}
                onClick={reloadPage}
                direction='row'
                alignItems='center'
                spacing={4}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#fff',
                    padding: 1,
                    borderRadius: '50%',
                    fontSize: theme.typography.pxToRem(16),
                  }}
                >
                  <LocalShippingIcon fontSize='inherit' color='primary' />
                </Box>
                <Typography variant='h6' noWrap component='div'>
                  Eagle Transportes
                </Typography>
              </Stack>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={4}>
              <Stack justifyContent='flex-end' alignItems='flex-end'>
                <Typography
                  variant='body2'
                  sx={{ fontSize: (theme) => theme.typography.pxToRem(13) }}
                  noWrap
                  component='div'
                >
                  {userInfo.name}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    fontSize: (theme) => theme.typography.pxToRem(12),
                    marginTop: -2,
                  }}
                  noWrap
                  component='div'
                >
                  {userInfo.email}
                </Typography>
              </Stack>
              <Avatar sx={{ width: 28, height: 28 }}>{userInfo.avatar}</Avatar>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer variant='permanent' open={true} drawerWidth={drawerWidth}>
        <Toolbar sx={{ minHeight: '48px !important' }} />
        <List
          disablePadding
          sx={{
            display: 'flex',
            mt: theme.spacing(1),
            flexDirection: 'column',
            gap: theme.spacing(1),
            overflow: 'hidden',
          }}
        >
          {drawer}
        </List>
        <Box
          sx={{
            marginTop: 'auto',
          }}
        >
          <Divider />
          <Box my={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            {drawerWidth === '15rem' ? (
              <Button
                onClick={handleLogout}
                size='small'
                color='error'
                variant='outlined'
                sx={{ width: '90%' }}
                startIcon={<LogoutIcon fontSize='small' />}
              >
                Sair
              </Button>
            ) : (
              <Tooltip title='Sair' placement='right-start'>
                <IconButton
                  onClick={handleLogout}
                  size='small'
                  aria-label='sair'
                >
                  <LogoutIcon color='error' fontSize='small' />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Drawer>
      <Box
        component='main'
        sx={{
          // flexGrow: 1,
          // paddingInline: theme.spacing(11),
          // paddingTop: theme.spacing(5),
          // backgroundColor: theme.palette.background.paper,
          // marginLeft: theme.spacing(-6),
          // display: "flex",
          // flexDirection: "column",
          // height: "100vh",
          flexGrow: 1,
          minWidth: 0,
          p: 3,
          pr: 8,
          pt: 5,
          // maxWidth: `calc(100% - ${drawerWidth})`,
          height: '92.6vh',
        }}
      >
        <Toolbar sx={{ minHeight: '48px !important' }} />
        {children}
      </Box>
    </Box>
  );
};
