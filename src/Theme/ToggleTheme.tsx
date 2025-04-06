import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SupportedColorScheme,
  useColorScheme,
} from "@mui/material";
import { FC } from "react";

const schemeOptions = ["system", "light", "dark"];

export const ToggleTheme: FC = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  const handleChange = (event: SelectChangeEvent) => {
    setMode(event.target.value as SupportedColorScheme);
  };
  return (
    <Select value={mode} onChange={handleChange}>
      {schemeOptions.map((scheme) => (
        <MenuItem key={scheme} value={scheme}>
          {scheme}
        </MenuItem>
      ))}
    </Select>
  );
};
