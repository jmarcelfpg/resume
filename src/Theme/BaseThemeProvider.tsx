import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const BaseThemeProvider: FC<{ theme: Theme } & PropsWithChildren> = (
  props
) => {
  return (
    <ThemeProvider theme={props.theme}>
      <CssBaseline enableColorScheme />
      {props.children}
    </ThemeProvider>
  );
};
