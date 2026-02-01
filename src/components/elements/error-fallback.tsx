import { Box, Button, Stack, Typography } from "@mui/material";

export const ErrorFallback = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack spacing={6} justifyContent={"center"} alignItems={"center"}>
        <Stack>
          <Typography
            sx={{ color: (theme) => theme.palette.gray[700] }}
            variant="h1"
            align="center"
          >
            Ooops!
          </Typography>
          <Typography
            sx={{ color: (theme) => theme.palette.gray[700] }}
            variant="h1"
            align="center"
          >
            Ocorreu um erro
          </Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={() => (window.location.href = "/")}
        >
          Recarrege a página
        </Button>
      </Stack>
    </Box>
  );
};
