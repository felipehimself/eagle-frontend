import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { useMemo } from "react";

type TLogoutButtonProps = {
  open: boolean;
  text: string;
  logout: () => void;
};

export const LogoutButton = (props: TLogoutButtonProps) => {
  const listItemButtonStyle = useMemo(() => {
    return props.open
      ? { justifyContent: "initial" }
      : { justifyContent: "center" };
  }, [props.open]);

  const listItemIconStyle = useMemo(() => {
    return props.open ? { mr: 3 } : { mr: "auto" };
  }, [props.open]);

  const listItemTextStyle = useMemo(() => {
    return props.open ? { opacity: 1 } : { opacity: 0 };
  }, [props.open]);

  return (
    <ListItem key="logout-button" disablePadding sx={{ display: "block" }}>
      <ListItemButton
        onClick={props.logout}
        sx={[
          {
            minHeight: 48,
            px: 2.5,
          },
          { ...listItemButtonStyle },
        ]}
      >
        <ListItemIcon
          sx={[
            {
              minWidth: 0,
              justifyContent: "center",
            },
            { ...listItemIconStyle },
          ]}
        >
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={props.text} sx={[{ ...listItemTextStyle }]} />
      </ListItemButton>
    </ListItem>
  );
};
