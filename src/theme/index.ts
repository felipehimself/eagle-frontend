import { createTheme } from "@mui/material";

export const appTheme = createTheme({
  palette: {
    // primary: {
    //   main: "#0C61DE",
    //   50: "rgba(12, 97, 222, 0.1)",
    //   100: "#244F79",
    //   200: "#005EFF",
    //   300: "#2D1BCC",
    // },
    // secondary: {
    //   main: "#9A1BCC",
    //   100: "rgba(154, 27, 204, 0.07)",
    //   200: "rgba(154, 27, 204, 0.25)",
    // },
    gray: {
      main: "#020718",
      light: "#ECEFF0",
      dark: "#52595F",
      50: "#FFFFFF",
      75: "#EEF4FF",
      100: "#FAFAFA",
      150: "#D9D9D9",
      200: "#ECEFF0",
      250: "#D6D8D9",
      300: "#ADB1B4",
      350: "#52525B",
      400: "#858A8E",
      450: "#696969",
      500: "#52595F",
      550: "#888888",
      600: "#3D464C",
      650: "#5D5D5D",
      700: "#29323A",
      800: "#141F27",
      850: "#09090B",
      900: "#000B14",
      contrastText: "#FFFFFF",
    },

    // orange: {
    //   main: "#FC7044",
    //   100: "rgba(252, 112, 68, 0.1)",
    //   200: "rgba(252, 112, 68, 1)",
    // },

    // yellow: {
    //   main: "rgba(174, 140, 19, 1)",
    //   100: "rgba(226, 177, 2, 0.1)",
    //   200: "rgba(180, 144, 27, 1)",
    //   300: "rgba(219, 177, 39, 0.1)",
    // },

    // green: {
    //   main: "rgba(7, 161, 4, 1)",
    //   100: "rgba(7, 161, 4, 0.1)",
    //   200: "#098C1E",
    // },

    // error: { main: "#f44336" },
    // warning: { main: "#ff9800" },
    // info: { main: "#2196f3" },
    // success: {
    //   main: "#28A745",
    //   dark: "#1C9924",
    //   contrastText: "#FFFFFF",
    // },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#141F27",
      // secondary: "#757575",
      // disabled: "#BDBDBD",
    },
  },
  typography: {
    fontFamily: [
      '"Lexend"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),

    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,

    h1: {
      fontSize: 32,
      fontWeight: 600, // stronger for main page titles
      lineHeight: 1.25, // ~125%
      letterSpacing: "-0.01em",
    },
    h2: {
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.005em",
    },
    h3: {
      fontSize: 24,
      fontWeight: 500,
      lineHeight: 1.35,
    },
    h4: {
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: 18,
      fontWeight: 500,
      lineHeight: 1.45,
    },
    h6: {
      fontSize: 16,
      fontWeight: 500, // bumped weight for hierarchy
      lineHeight: 1.5,
    },

    subtitle1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.6, // more breathing room for secondary text
      letterSpacing: "0.01em",
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 500, // gives it distinction from body2
      lineHeight: 1.6,
      letterSpacing: "0.01em",
    },

    body1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.6, // standard paragraph
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.6,
    },

    caption: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: "0.02em",
    },
    overline: {
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1.4,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    },
    // button: {
    //   fontSize: 14,
    //   fontWeight: 500,
    //   lineHeight: 1.75,
    //   letterSpacing: "-0.01562em",
    //   textTransform: "none",
    // },
  }, //     0, 1, 2, 3, 4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15  16  17  18, 19, 20, 21, 22, 23,
  spacing: [
    2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40,
    42, 44, 46, 48,
  ],
  // components: {
  // MuiButton: {
  //   styleOverrides: {
  //     root: {
  //       height: 42,
  //       fontWeight: 500,
  //       fontSize: 14,
  //       borderRadius: 8,
  //       lineHeight: "150%",
  //       textTransform: "none",
  //       paddingBlock: 10,
  //       paddingInline: 24,
  //       boxShadow: "none",
  //       ":hover": {
  //         boxShadow: "none",
  //       },
  //     },
  //     containedPrimary: {
  //       backgroundColor: "#0C61DE",
  //       color: "#fff",
  //       "&:hover": {
  //         backgroundColor: "#0C61DE",
  //       },
  //     },
  //     outlinedPrimary: {
  //       height: 44,
  //       backgroundColor: "transparent",
  //       border: "1.5px solid #ECEFF0",
  //       color: "#000B14",
  //     },
  //   },
  // },
  // MuiTextField: {
  //   defaultProps: {
  //     InputProps: {
  //       startAdornment: undefined,
  //     },
  //   },
  //   styleOverrides: {
  //     root: {
  //       autoComplete: "off",
  //       fontSize: 14,
  //       "& .MuiOutlinedInput-root": {
  //         height: 44,
  //         fontWeight: 400,
  //         color: "#52595F",
  //         borderRadius: 8,
  //         lineHeight: "150%",
  //         textTransform: "none",
  //         "& fieldset": {
  //           borderColor: "#ECEFF0",
  //         },
  //         "&:hover fieldset": {
  //           borderColor: "#ECEFF0",
  //         },
  //         "&.Mui-focused fieldset": {
  //           borderColor: "#ECEFF0",
  //         },
  //       },
  //       "& input::placeholder": {
  //         color: "#52595F",
  //         opacity: 1,
  //       },
  //     },
  //   },
  // },
  // MuiOutlinedInput: {
  //   styleOverrides: {
  //     root: {
  //       height: 44,
  //       fontWeight: 400,
  //       color: "#52595F",
  //       borderRadius: 8,
  //       lineHeight: "150%",
  //       textTransform: "none",
  //       "& .MuiOutlinedInput-notchedOutline": {
  //         borderColor: "#ECEFF0",
  //       },
  //       "&:hover .MuiOutlinedInput-notchedOutline": {
  //         borderColor: "#bdbdbd",
  //       },
  //       "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
  //         borderColor: "#ECEFF0",
  //       },
  //     },
  //     input: {
  //       padding: "10px 14px",
  //       fontsize: 14,
  //       "&::placeholder": {
  //         fontSize: 15, // <- Change placeholder font size here
  //         color: "#52595F",
  //         opacity: 1,
  //         fontWeight: 500,
  //       },
  //     },
  //   },
  // },
  // MuiInputLabel: {
  //   styleOverrides: {
  //     root: {
  //       color: "#666666",
  //       fontSize: 14,
  //       transform: "translate(14px, 14px) scale(1)", // ensures alignment when not focused
  //       "&.MuiInputLabel-shrink": {
  //         transform: "translate(14px, -6px) scale(0.75)", // when focused or has value
  //         color: "#9e9e9e", // Focused color
  //       },
  //     },
  //   },
  // },
  // MuiChip: {
  //   styleOverrides: {
  //     root: {
  //       borderRadius: 100,
  //       paddingBlock: "6px",
  //       paddingInline: "16px",
  //     },
  //     outlined: {
  //       // backgroundColor: "rgba(154, 27, 204, 0.07)",
  //       // border: `1.5px solid "rgba(154, 27, 204, 0.25)`,
  //       // color: "rgba(154, 27, 204, 0.07)",
  //     },
  //     label: {
  //       padding: 0,
  //       display: "flex",
  //       alignItems: "center", // vertically centers text and icon
  //     },
  //   },
  // },
  // MuiTabs: {
  //   styleOverrides: {
  //     indicator: {
  //       height: 1.5,
  //       borderRadius: 2,
  //       // backgroundColor: "#0C61DE", // ✅ fixed
  //     },
  //   },
  // },
  // MuiTab: {
  //   styleOverrides: {
  //     root: {
  //       paddingBottom: 10,
  //       textTransform: "none",
  //       fontWeight: 500,
  //       color: "#52595F",
  //       "&.Mui-selected": {
  //         color: "#0C61DE",
  //       },
  //       "&.Mui-focusVisible": {
  //         backgroundColor: "rgba(0, 102, 235, 0.08)",
  //       },
  //     },
  //   },
  //   defaultProps: {
  //     disableRipple: true,
  //   },
  // },
  // MuiDialog: {
  //   styleOverrides: {
  //     paper: {
  //       // padding: 32,
  //       borderRadius: 32,
  //     },
  //   },
  // },
  // MuiDialogTitle: {
  //   styleOverrides: {
  //     root: {
  //       borderBottom: "none", // Remove top divider line
  //       paddingInline: 32,
  //       paddingTop: 32,
  //       paddingBottom: 14, // TODO: se desconfigurar headers dos modais, só remover essa prop
  //     },
  //   },
  // },
  // MuiDialogContent: {
  //   styleOverrides: {
  //     root: {
  //       paddingInline: 32,
  //     },
  //   },
  // },
  // MuiDialogActions: {
  //   styleOverrides: {
  //     root: {
  //       borderTop: "none", // Remove bottom divider line
  //       paddingInline: 32,
  //       paddingBottom: 32,
  //     },
  //   },
  // },
  // MuiSelect: {
  //   styleOverrides: {
  //     root: {
  //       borderRadius: 8,
  //       backgroundColor: "#FFFFFF",
  //       "& .MuiSelect-select": {
  //         padding: 12,
  //         display: "flex",
  //         alignItems: "center",
  //       },
  //     },
  //     outlined: {
  //       borderRadius: 8,
  //       borderColor: "#ECEFF0",
  //     },
  //     iconOutlined: {
  //       color: "#999",
  //       right: "12px",
  //     },
  //   },
  // },
  // },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: "small",
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        noOptionsText: "Nenhuma opção encontrada",
        clearText: "Limpar",
        closeText: "Fechar",
        openText: "Abrir",
      },
    },
  },
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1440,
    },
  },
});
