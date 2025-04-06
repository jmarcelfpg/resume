import MotionButtonExample from "../motionExamples";
import { baseTheme, BaseThemeProvider } from "../Theme";

export const DashBoard = () => {
  return (
    <BaseThemeProvider theme={baseTheme}>
      Dashboard
      <MotionButtonExample />
    </BaseThemeProvider>
  );
};
