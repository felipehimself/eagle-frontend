import { PageHeader } from "@/components/elements/page-header";
import { RouteFormComponent } from "../components/route-form-component";
import { Stack } from "@mui/material";

export const AddRoute = () => {
  return (
    <Stack spacing={6}>
      <PageHeader showBackButton title="Rotas" subtitle="Cadastrar Rota" />
      <RouteFormComponent
        isLoading={false}
        onSubmit={(data) => console.log(data)}
        shouldDisable={false}
        initialData={undefined}
      />
    </Stack>
  );
};
