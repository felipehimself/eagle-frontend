import { Box, useTheme } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
export const SuspenseFallback = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
        "@keyframes spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      }}
    >
      <RefreshIcon
        fontSize="large"
        style={{
          animation: "spin 1s linear infinite",
          color: theme.palette.primary.main,
        }}
      />
    </Box>
  );
};
