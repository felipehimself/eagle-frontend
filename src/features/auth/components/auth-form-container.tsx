import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export const AuthFormContainer: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Box sx={{ paddingInline: "1rem" }}>
      <Box
        sx={{
          p: 1,
          maxWidth: 400,
          margin: "0 auto",
          marginTop: "14vh",
          backgroundColor: (theme) => theme.palette.background.paper,
          borderRadius: 2,
          padding: "1.7rem",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
