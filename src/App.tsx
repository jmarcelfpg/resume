import { Route, Routes } from "react-router";
import { DashBoard, MainPage } from "./Pages";
import { baseTheme, BaseThemeProvider } from "./Theme";

function App() {
  return (
    <BaseThemeProvider theme={baseTheme}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BaseThemeProvider>
  );
}

export default App;
