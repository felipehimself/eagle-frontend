// theme.d.ts
// import { Palette, PaletteOptions } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface PaletteColor {
    main: string;
    [key: number]: string;
  }

  interface Palette {
    gray: Palette['primary'] & {
      main: string;

      // lighter?: string;
      // lightest?: string;
      // darkest?: string;
      [key: number]: string;
    };

    orange: Palette['primary'] & {
      main: string;
      [key: number]: string;
    };

    yellow: Palette['primary'] & {
      main: string;
      [key: number]: string;
    };

    green: Palette['primary'] & {
      main: string;
      [key: number]: string;
    };
  }
  interface PaletteOptions {
    gray: Palette['primary'] & {
      main: string;

      // lighter?: string;
      // lightest?: string;
      // darkest?: string;
      [key: number]: string;
    };

    orange?: Palette['parimary'] & {
      main: string;
      [key: number]: string;
    };

    yellow?: Palette['parimary'] & {
      main: string;
      [key: number]: string;
    };

    green?: Palette['parimary'] & {
      main: string;
      [key: number]: string;
    };
  }
}
