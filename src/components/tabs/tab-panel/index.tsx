// import { Box, Grid, useTheme } from "@mui/material";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// export const TabPanel = (props: TabPanelProps) => {
//   const theme = useTheme();
//   const { children, value, index, ...other } = props;

//   return (
//     <Box
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//       // TODO: implementar React Scroll Bars 2
//       sx={{
//         flex: 1,
//         height: "100%",
//         overflowY: "auto",
//       }}
//     >
//       {value === index && (
//         // TODO: devo usar este mesmo component nos outros locais que possuem tab, portanto, precisarei adaptar os locais para ser da forma abaixo, sem retornar  grid
//         // <Grid container spacing={theme.spacing(9)}>
//         <> {children} </>
//         // </Grid>
//       )}
//     </Box>
//   );
// };
