import { PageHeader } from "@/components/elements/page-header";
import { DriverFormComponent } from "../components/driver-form-component";
import { Stack } from "@mui/material";

export const AddDriver = () => {
  return (
    <Stack spacing={6}>
      <PageHeader
        showBackButton
        subtitle="Cadastrar"
        title="Motorista / Ajudante"
      />
      <DriverFormComponent
        isLoading={false}
        onSubmit={(data) => console.log(data)}
        shouldDisable={false}
      />
    </Stack>
  );
};
