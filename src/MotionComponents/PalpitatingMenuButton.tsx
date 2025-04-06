import { IconButton } from "@mui/material";
import { FC } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "motion/react";
import { usePalpitation } from "./MotionHooks/usePalpitation";

export const MotionIconButton = motion.create(IconButton);

const stepMiliseconds = 250;
const range = { min: 0.9, max: 1.1 };
const initialState = { palpitation: 1, isPalpitating: false };

export const PalpitatingMenuButton: FC = () => {
  const { palpitation, setIsPalpitating } = usePalpitation(
    initialState,
    stepMiliseconds,
    range
  );

  return (
    <MotionIconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
      onClick={(event) => {
        event.stopPropagation();
      }}
      animate={{ scale: palpitation }}
      onHoverStart={() => {
        setIsPalpitating(true);
      }}
      onHoverEnd={() => {
        setIsPalpitating(false);
      }}
    >
      <MenuIcon />
    </MotionIconButton>
  );
};
