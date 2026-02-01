import { CSSObject, styled, Theme } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';

// const drawerWidth = "15rem";

interface DrawerProps {
  open?: boolean;
  drawerWidth?: string | number;
}

const openedMixin = (
  theme: Theme,
  drawerWidth: string | number,
): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<DrawerProps>(({ theme, open, drawerWidth = '15rem' }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',

  ...(open && {
    ...openedMixin(theme, drawerWidth),
    '& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
  }),
}));
