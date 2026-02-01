import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GenericMRT } from "@/components/elements/generic-mrt";
import { PageHeader } from "@/components/elements/page-header";
import { FabButton } from "@/components/elements/fab-button";
import { DrawerComponent } from "@/components/elements/drawer-component";
import { RouteFilterForm } from "../components/route-filter-form";

export const RegisteredRoutes = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const navigate = useNavigate();

  const handleNavigateEdit = (id: string) => {
    navigate(`/app/motoristas/editar/${id}`);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleSubmit = () => {
    setOpenDrawer(false);
  };

  // const handleAdd = () => navigate("/app/motoristas/cadastrar");

  // const cols = useMemo<MRT_ColumnDef<TRoute>[]>(() => {
  //   return [
  //     {
  //       header: "Cadastro",
  //       size: 110,
  //       align: "center",
  //       enableResizing: false,
  //       Cell: (cell) => (
  //         <FabButton
  //           onClick={() => {
  //             handleNavigateEdit(String(cell.row.original.id));
  //           }}
  //           icon="VIEW"
  //           title="Visualizar cadastro"
  //         />
  //       ),
  //     },
  //     {
  //       header: "Região Base",
  //       accessorKey: "dadosPrincipais.regiaoBase",
  //       Cell: ({ cell }) => {
  //         const regioes = cell.getValue() as string[];
  //         return regioes?.join(", ");
  //       },
  //     },
  //     {
  //       accessorKey: "dadosPrincipais.nome",
  //       header: "Nome",
  //       grow: true,
  //     },
  //     {
  //       accessorKey: "dadosPrincipais.celular",
  //       header: "Celular",
  //     },
  //     {
  //       accessorKey: "dadosPrincipais.email",
  //       header: "E-mail",
  //     },
  //     {
  //       accessorKey: "dadosPrincipais.ufNaturalidade",
  //       header: "UF",
  //     },
  //     {
  //       accessorKey: "dadosPrincipais.placa",
  //       header: "Placa",
  //     },
  //     {
  //       accessorKey: "documentos.rg",
  //       header: "RG",
  //     },
  //     {
  //       accessorKey: "documentos.cpf",
  //       header: "CPF",
  //     },
  //     {
  //       accessorKey: "documentos.razaoSocial",
  //       header: "Razão Social",
  //     },
  //     {
  //       accessorKey: "habilitacao.numeroCnh",
  //       header: "CNH",
  //     },
  //   ];
  // }, []);

  return (
    <Stack spacing={6}>
      <PageHeader
        // handleAdd={handleAdd}
        title="Rotas"
        subtitle="Gerencie as rotas cadastradas"
        handleDrawer={handleOpenDrawer}
      />

      {/* TODO: term campo de pesquisa que preencherá o MRT */}

      <Box sx={{ maxHeight: "70vh" }}>
        <GenericMRT enableStickyFooter columns={[]} data={[]} />
      </Box>

      <DrawerComponent
        open={openDrawer}
        onClose={handleCloseDrawer}
        onSubmit={handleSubmit}
        content={<RouteFilterForm />}
      />
    </Stack>
  );
};
