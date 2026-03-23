import { useCallback, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import useTheme from "../../hook/useTheme";

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const buttonRef = useRef(null);

  const handleToggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    if (!document.startViewTransition) {
      flushSync(() => {
        toggleTheme();
      });
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme();
      });
    });

    await transition.ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();

    const x = left + width / 2;
    const y = top + height / 2;

    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [toggleTheme, duration]);

  return (
    <button
      ref={buttonRef}
      onClick={handleToggleTheme}
      className={cn(className)}
      {...props}
    >
      {isDark ? <Sun /> : <Moon />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};