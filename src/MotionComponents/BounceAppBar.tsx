import { AppBar, useTheme } from "@mui/material";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const spring = { damping: 5, stiffness: 200, restDelta: 0.5 };
export const MotionAppBar = motion.create(AppBar);

export const BounceAppBar: FC<PropsWithChildren> = (props) => {
  const theme = useTheme();
  const appBarRef = useRef(document.createElement("div"));
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState("up");
  const [marginBottom, setMarginBottom] = useState(theme.spacing(2));
  const [isDragging, setIsDragging] = useState(false);
  const mousedownEvent = useRef<MouseEvent | null>(null);
  const y = useSpring(10, spring);

  const updateEventMouseDown = (event: MouseEvent) => {
    mousedownEvent.current = event;
  };

  const handlePointerMove = useCallback(
    (event: MouseEvent) => {
      console.log({ mousedownEvent, event });
      const isStillOutside = y.get() - scrollY.get() < 0;
      if (!isDragging && isStillOutside && !event.button) {
        setScrollDirection("up");
        y.set(10 + scrollY.get());
      } 
    //   else if (!isDragging && !isStillOutside && !event.button) {
    //     setScrollDirection("down");
    //     y.jump(-100 + scrollY.get());
    //   }
    },
    [isDragging, y, scrollY, mousedownEvent]
  );

  useMotionValueEvent(scrollY, "change", (current) => {
    const previousValue = scrollY.getPrevious() || 0;
    const diff = current - previousValue;
    const newScrollDirection = diff > 0 ? "down" : "up";
    const isStillOutside = y.get() - scrollY.get() < 0;
    if (newScrollDirection === "up") {
      y.set(10 + scrollY.get());
      if (!isStillOutside) {
        y.jump(scrollY.get());
      }
    } else if (newScrollDirection === "down") {
      y.jump(-100 + scrollY.get());
    }
    setScrollDirection(newScrollDirection);
  });

  useEffect(() => {
    if (!isDragging && scrollDirection === "down") {
      y.set(-100 + scrollY.get());
    }
  }, [scrollDirection, scrollY, y, isDragging]);

  useEffect(() => {
    window.addEventListener("mousedown", updateEventMouseDown);
    window.addEventListener("mouseup", handlePointerMove);
    return () => {
      window.removeEventListener("mouseup", handlePointerMove);
      window.removeEventListener("mousedown", updateEventMouseDown);
    };
  }, [handlePointerMove]);

  useEffect(() => {
    y.set(10);
  }, []);

  return (
    <MotionAppBar
      ref={appBarRef}
      position="relative"
      initial={{ y: -100 }}
      style={{ y }}
      sx={{
        zIndex: theme.zIndex.appBar,
        maxWidth: "calc(100vw - 30px)",
        placeSelf: "anchor-center",
        marginBottom,
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
      onViewportLeave={() => {
        if (!isDragging && scrollDirection === "down") {
          y.jump(-100 + scrollY.get());
          if (!scrollY.get()) {
            setMarginBottom(theme.spacing(-5));
          }
        }
      }}
      onViewportEnter={() => {
        setMarginBottom(theme.spacing(2));
      }}
      onDragStart={() => {
        setIsDragging(true);
      }}
      onDrag={({ clientY }: MouseEvent) => {
        const element = appBarRef.current;
        const nextJump =
          scrollY.get() +
          clientY -
          element.offsetTop -
          element.offsetHeight / 2;
        const previousJump = y.getPrevious() || 0;
        if (nextJump - previousJump >= 0) {
          setScrollDirection("up");
        } else {
          setScrollDirection("down");
        }
        y.jump(nextJump);
      }}
      onDragEnd={() => {
        if (y.get() > scrollY.get() + 300) {
          y.set(-100 + scrollY.get());
          setScrollDirection("down");
        } else {
            y.set(10 + scrollY.get());
        }
        setIsDragging(false);
        y.stop();
      }}
      drag="y"
    >
      {props.children}
    </MotionAppBar>
  );
};
