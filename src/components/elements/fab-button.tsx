import { useMemo } from "react";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

import { Tooltip } from "@mui/material";
import Fab from "@mui/material/Fab";
import { FabProps } from "@mui/material/Fab";

type TFabButtonProps = FabProps & {
  icon?: "EDIT" | "DELETE" | "CONFIRM" | "VIEW" | "ADD" | "MOVE";
  color?: FabProps["color"];
  scale?: number;
};

export const FabButton = (props: TFabButtonProps) => {
  const { icon, title, color = "primary", scale = 0.7, ...rest } = props;

  const Icon = useMemo(() => {
    switch (icon) {
      case "EDIT":
        return EditIcon;
      case "DELETE":
        return DeleteIcon;
      case "CONFIRM":
        return CheckIcon;
      case "ADD":
        return AddIcon;
      case "VIEW":
        return SearchIcon;
      case "MOVE":
        return CompareArrowsIcon;
      default:
        return CheckIcon;
    }
  }, [icon]);

  return (
    <Tooltip title={title}>
      <Fab
        sx={{ transform: `scale(${scale})` }}
        {...rest}
        color={color}
        size="small"
      >
        <Icon fontSize="small" />
      </Fab>
    </Tooltip>
  );
};
