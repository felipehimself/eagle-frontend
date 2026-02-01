import { Typography, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

type TListItemButtonProps = {
  label: string;
  to: string;
};

export const NavListItem = (props: TListItemButtonProps) => {
  const theme = useTheme();
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "active-menu menu-item" : "inactive-menu menu-item"
      }
      style={{
        padding: theme.spacing(2),
      }}
      to={props.to}
    >
      <Typography
        sx={{
          lineHeight: "100%",
          letterSpacing: 0,
          fontWeight: 300,
          fontSize: theme.typography.pxToRem(14),
        }}
      >
        {props.label}
      </Typography>
    </NavLink>
  );
};
