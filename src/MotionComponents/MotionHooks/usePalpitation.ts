import { useAnimationFrame } from "motion/react";
import { useState } from "react";

export const usePalpitation = (
  initialState = { palpitation: 0, isPalpitating: false },
  stepMiliseconds = 250,
  range = { min: 1, max: 20 }
) => {
  const [palpitation, setPalpitation] = useState(initialState.palpitation);
  const [isPalpitating, setIsPalpitating] = useState(
    initialState.isPalpitating
  );

  useAnimationFrame((time) => {
    const modularTime = Math.ceil(time / stepMiliseconds) % 2;
    const newScale = modularTime ? range.max : range.min;
    if (isPalpitating && newScale !== palpitation) {
      setPalpitation(newScale);
    } else if (!isPalpitating) {
      setPalpitation(initialState.palpitation);
    }
  });

  return { palpitation, isPalpitating, setIsPalpitating };
};
