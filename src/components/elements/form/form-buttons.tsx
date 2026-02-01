// import { Button, Stack } from "@mui/material";
// import { useNavigate } from "react-router-dom";

import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

// interface FormButtonsProps {
//   clearErrors: () => void;
// }

// export const FormButtons = (props: FormButtonsProps) => {
//   const navigate = useNavigate();
//   const goBack = () => navigate(-1);

//   const handleCancel = () => {
//     props.clearErrors();
//     goBack();
//   };

//   return (
//     <Stack direction="row" spacing={2} justifyContent="flex-end">
//       <Button
//         sx={{ alignSelf: "flex-end" }}
//         size="small"
//         type="button"
//         variant="contained"
//         color="error"
//         onClick={handleCancel}
//       >
//         Cancelar
//       </Button>
//       <Button size="small" type="submit" variant="contained">
//         Salvar
//       </Button>
//     </Stack>
//   );
// };

interface IFormButtonsProps {
  shouldDisable: boolean;
}

export const FormButtons = (props: IFormButtonsProps) => {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="flex-end"
      pr={2}
      pt={2}
      pb={2}
    >
      <Button
        variant="contained"
        color="error"
        type="button"
        onClick={() => navigate(-1)}
        disabled={props.shouldDisable}
      >
        Cancelar
      </Button>
      <Button variant="contained" type="submit" disabled={props.shouldDisable}>
        Salvar
      </Button>
    </Stack>
  );
};
