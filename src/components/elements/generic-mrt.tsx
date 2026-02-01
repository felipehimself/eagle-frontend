import { useTheme } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
  MRT_TableOptions,
} from "material-react-table";
import { MRT_Localization_PT } from "material-react-table/locales/pt";

type CustomMRTProps<T extends Record<string, any>> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
} & Partial<MRT_TableOptions<T>>;

export const GenericMRT = <T extends Record<string, any>>(
  props: CustomMRTProps<T>
) => {
  const theme = useTheme();
  const { columns, data, ...rest } = props;

  const table = useMaterialReactTable({
    localization: MRT_Localization_PT,
    columns: props.columns,
    data: props.data,
    enableColumnOrdering: false,
    // enableGlobalFilter: false,
    enableDensityToggle: false,
    enableColumnResizing: true,
    // enablePagination: false,
    // enableFullScreenToggle: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    // enableTableFooter: false,
    // enableBottomToolbar: false,
    // enableHiding: false,
    state: {
      ...rest.state,
      showAlertBanner: false,
      density: "compact",
    },
    muiTablePaperProps: {
      sx: {
        backgroundColor: "#fff",
        height: "100%",
        margin: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        maxHeight: "76vh",
      },
    },
    muiTableContainerProps: {
      sx: {
        backgroundColor: "#fff",
        flex: "1 1 auto", // Take all available space
        overflow: "auto", // Internal scroll
        maxHeight: "76vh",
      }, // Remove any max-height constraints },
    },
    muiTableHeadCellProps: {
      sx: { backgroundColor: "#fff", fontWeight: 400 },
    },
    muiTableBodyCellProps: {
      sx: { backgroundColor: "#fff", fontWeight: 300 },
    },
    muiTableHeadRowProps: {
      sx: { backgroundColor: "#fff" },
    },
    muiTopToolbarProps: {
      sx: { backgroundColor: "#fff" },
    },
    muiBottomToolbarProps: {
      sx: { backgroundColor: "#fff" },
    },
    muiTableBodyRowProps: {
      sx: {
        backgroundColor: "#fff", // force rows white
        height: "42px",
        "&:nth-of-type(odd)": { backgroundColor: "#fff" }, // override striping
        "&:hover": { backgroundColor: "#fafafa" }, // optional: subtle hover
      },
    },

    // muiSearchTextFieldProps: {
    //   variant: "standard", // or 'filled' if you prefer that style

    //   sx: {
    //     "& .MuiInput-root::after": {
    //       borderBottomColor: "#999 !important",
    //     },
    //     "& .MuiInput-root.Mui-focused::after": {
    //       borderBottomColor: "#999 !important",
    //     },
    //   },
    // },
    // muiTableFooterProps: {
    //   sx: {
    //     "& . MuiBox-root css-1bg91d4": {
    //       display: "none",
    //     },
    //   },
    // },

    // muiTopToolbarProps: {
    //   sx: {
    //     backgroundColor: "transparent",
    //   },
    // },
    // muiToolbarAlertBannerProps: {
    //   sx: {
    //     backgroundColor: "transparent",
    //   },
    // },

    // muiBottomToolbarProps: {
    //   sx: {
    //     backgroundColor: "transparent",
    //   },
    // },
    // muiTableProps: {
    //   sx: {
    //     backgroundColor: theme.palette.gray.contrastText,
    //     boxShadow: "none",
    //     borderRadius: 0,
    //   },
    // },
    // muiTableContainerProps: {
    //   sx: {
    //     backgroundColor: "transparent",
    //   },
    // },
    // // Make the header cells transparent
    // muiTableHeadCellProps: {
    //   sx: {
    //     backgroundColor: theme.palette.gray.contrastText,
    //     color: theme.palette.gray[450],
    //     fontWeight: theme.typography.fontWeightMedium,
    //     lineHeight: "100%",
    //     letterSpacing: 0,
    //     opacity: 0.7,
    //     fontSize: theme.typography.pxToRem(14),
    //   },
    // },
    // // Make the body cells transparent
    // muiTableBodyCellProps: {
    //   sx: {
    //     backgroundColor: "transparent",
    //     fontWeight: (theme) => theme.typography.fontWeightLight,
    //     // borderBottom: "none",
    //   },
    // },
    // // Optional: also make rows transparent on hover/selection
    // muiTableBodyRowProps: {
    //   sx: {
    //     backgroundColor: "transparent",
    //     "&:hover": {
    //       backgroundColor: "rgba(255,255,255,0.05)", // Optional hover effect
    //     },
    //   },
    // },

    // muiTablePaperProps: {
    //   sx: {
    //     backgroundColor: "transparent",
    //     boxShadow: "none", // remove shadow if using Paper
    //   },
    // },

    // muiTableHeadRowProps: {
    //   sx: {
    //     boxShadow: "none",
    //     backgroundColor: "transparent",
    //   },
    // },
    ...rest,
  });

  return <MaterialReactTable table={table} />;
};
