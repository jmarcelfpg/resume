import {
  alpha,
  createTheme,
  darken,
  getContrastRatio,
  responsiveFontSizes,
} from "@mui/material";
import {
  PaletteColor,
  Palette as MuiPalette,
  TypeBackground,
} from "@mui/material/styles/createPalette";

declare module "@mui/material/styles" {
  interface Palette {
    ochre?: PaletteColor;
    violet?: PaletteColor;
  }

  interface PaletteOptions {
    ochre?: MuiPalette["primary"];
    violet?: MuiPalette["primary"];
    secondaryBackground?: Partial<TypeBackground>;
  }
}

const violetBase = "#7F00FF";
const violetMain = alpha(violetBase, 0.7);

const baseBackground = "#EB5217";
const secondaryBackground = "#EB9917";
const basePaper = "#EB7617";

export const baseTheme = responsiveFontSizes(
  createTheme({
    palette: {
      ochre: {
        main: "#E3D026",
        light: "#E9DB5D",
        dark: "#A29415",
        contrastText: "#242105",
      },
      violet: {
        main: violetMain,
        light: alpha(violetBase, 0.5),
        dark: alpha(violetBase, 0.9),
        contrastText:
          getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
      },
      background: {
        paper: basePaper,
        default: baseBackground,
      },
      secondaryBackground: {
        paper: basePaper,
        default: secondaryBackground,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (themeParams) => {
          const timeTransition = themeParams.palette.mode === "dark" ? 0.25 : 3;
          const isWindows = window.navigator.userAgent.includes("Windows");
          const scrollBarPadding = isWindows ? "15px" : "0px";

          return {
            body: {
              minWidth: `calc(100vw - ${scrollBarPadding})`,
              minHeight: `calc(100vh - ${scrollBarPadding})`,
              overflow: "auto",
              [themeParams.breakpoints.down("md")]: {
                backgroundImage: `linear-gradient(45deg, ${
                  themeParams.palette.background.default
                } 40%,  ${
                  (themeParams as any).palette.secondaryBackground.default
                } 100%)`,
              },
              [themeParams.breakpoints.up("md")]: {
                backgroundImage: `linear-gradient(45deg, ${
                  themeParams.palette.background.default
                } 55%,  ${
                  (themeParams as any).palette.secondaryBackground.default
                } 100%)`,
              },
              [themeParams.breakpoints.up("lg")]: {
                backgroundImage: `linear-gradient(45deg, ${
                  themeParams.palette.background.default
                } 70%,  ${
                  (themeParams as any).palette.secondaryBackground.default
                } 100%)`,
              },
            },
            "#root": {
              width: "100%",
              height: "100%",
              "& > div": {
                transition: `all ${timeTransition}s ease-in-out`,
              },
            },
          };
        },
      },
    },
    colorSchemes: {
      light: true,
      dark: {
        palette: {
          background: {
            default: darken(baseBackground, 0.75),
            paper: darken(basePaper, 0.75),
          },
          secondaryBackground: {
            default: darken(secondaryBackground, 0.75),
            paper: darken(basePaper, 0.75),
          },
        },
      },
    },
  })
);
