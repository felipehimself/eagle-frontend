import { SvgIcon } from "@mui/material";
export type TDrawerOptions = {
  to: string;
  icon: typeof SvgIcon;
  label: string;
  id: string;
  children?: TDrawerChildren[];
};

export type TDrawerChildren = {
  to: string;
  id: string;
  icon: typeof SvgIcon;
  label: string;
};
