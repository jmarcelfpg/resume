import { AnimatePresence, motion } from "motion/react";
import { Box, Button } from "@mui/material";
import { baseTheme, BaseThemeProvider, ToggleTheme } from "../Theme";
import { useState } from "react";

const MotionButton = motion.create(Button);

function MotionButtonExample() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <BaseThemeProvider theme={baseTheme}>
      <AnimatePresence>
        <Box sx={{ height: 3000 }}>
          <Button
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          >
            {isVisible ? "Visible" : "Hidden"}
          </Button>
          {isVisible ? (
            <MotionButton
              initial={{ scale: 2 }}
              animate={{
                scale: 1,
                transition: { duration: 0.5 },
              }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              MotionButton
            </MotionButton>
          ) : null}
          <ToggleTheme />
        </Box>
      </AnimatePresence>
    </BaseThemeProvider>
  );
}

export default MotionButtonExample;
