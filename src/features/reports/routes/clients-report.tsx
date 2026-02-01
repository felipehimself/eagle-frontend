// import { DrawerComponent } from "@/components/elements/drawer-component";
// import { GenericMRT } from "@/components/elements/generic-mrt";
// import { PageHeader } from "@/components/elements/page-header";
// import { Box, Stack } from "@mui/material";
// import { useState } from "react";

// export const ClientsReport = () => {
//   const [openDrawer, setOpenDrawer] = useState(false);

//   const handleOpenDrawer = () => {
//     setOpenDrawer(true);
//   };

//   const handleCloseDrawer = () => {
//     setOpenDrawer(false);
//   };

//   const handleSubmit = () => {
//     setOpenDrawer(false);
//   };

//   return (
//     <Stack spacing={6}>
//       <PageHeader
//         // handleAdd={handleAdd}
//         title="Clientes"
//         subtitle="Relatórios de clientes e parceiros cadastradas"
//         handleDrawer={handleOpenDrawer}
//       />
//       <Box sx={{ maxHeight: "70vh" }}>
//         <GenericMRT enableStickyFooter columns={[]} data={[]} />
//       </Box>

//       <DrawerComponent
//         open={openDrawer}
//         onClose={handleCloseDrawer}
//         onSubmit={handleSubmit}
//         content={<PlaceHolder />}
//       />
//     </Stack>
//   );
// };

// const PlaceHolder = () => {
//   return <Box>Placeholder</Box>;
// };
