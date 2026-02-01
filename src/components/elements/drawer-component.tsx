import { Drawer, Box, Stack, Button } from "@mui/material";

interface IDrawerComponentProps {
  content: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  wrapperStyles?: React.CSSProperties;
}
export const DrawerComponent = (props: IDrawerComponentProps) => {
  return (
    <Drawer anchor="right" open={props.open} onClose={props.onClose}>
      <Stack
        sx={{
          width: "20rem",
          mt: "3.125rem",
          p: "0.625rem",
          height: "100%",
          ...props?.wrapperStyles,
        }}
      >
        {props.content}
      </Stack>
      <Stack sx={{ p: "0.625rem" }} spacing={2} direction="row" ml={"auto"}>
        <Button variant="contained" color="error" onClick={props.onClose}>
          Cancelar
        </Button>
        <Button onClick={props.onSubmit} variant="contained">
          Pesquisar
        </Button>
      </Stack>
    </Drawer>
  );
};
