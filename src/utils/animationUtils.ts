import { Variants } from "framer-motion";

/**
 * Fade in from bottom animation
 * @param delay - Animation delay in seconds
 * @param duration - Animation duration in seconds
 * @returns Framer Motion variants
 */
export function fadeInUp(delay: number = 0, duration: number = 0.5): Variants {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: "easeOut" },
    },
  };
}

/**
 * Fade in with scale animation
 * @param delay - Animation delay in seconds
 * @param duration - Animation duration in seconds
 * @returns Framer Motion variants
 */
export function fadeInScale(
  delay: number = 0,
  duration: number = 0.4
): Variants {
  return {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration, delay },
    },
  };
}

/**
 * Container animation with staggered children
 * @param staggerDelay - Delay between child animations in seconds
 * @param duration - Animation duration in seconds
 * @returns Framer Motion variants
 */
export function staggerChildren(
  staggerDelay: number = 0.1,
  duration: number = 0.6
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration,
        staggerChildren: staggerDelay,
      },
    },
  };
}

/**
 * Card hover animation
 * @param yOffset - Y offset for hover state
 * @param scale - Scale factor for hover state
 * @returns Framer Motion hover variants
 */
export function cardHover(yOffset: number = -4, scale: number = 1): Variants {
  return {
    hover: {
      y: yOffset,
      scale,
      boxShadow: "xl",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };
}

/**
 * Slide in from direction animation
 * @param direction - Direction to slide from ('left', 'right', 'top', 'bottom')
 * @param distance - Distance to slide from in pixels
 * @param delay - Animation delay in seconds
 * @param duration - Animation duration in seconds
 * @returns Framer Motion variants
 */
export function slideIn(
  direction: "left" | "right" | "top" | "bottom" = "bottom",
  distance: number = 50,
  delay: number = 0,
  duration: number = 0.6
): Variants {
  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: -distance, opacity: 0 };
      case "right":
        return { x: distance, opacity: 0 };
      case "top":
        return { y: -distance, opacity: 0 };
      case "bottom":
        return { y: distance, opacity: 0 };
    }
  };

  return {
    hidden: getInitialPosition(),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { duration, delay, ease: "easeOut" },
    },
  };
}

/**
 * Modal entrance animation
 * @param delay - Animation delay in seconds
 * @returns Framer Motion variants
 */
export function modalEntrance(delay: number = 0): Variants {
  return {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.3 },
    },
  };
}

/**
 * Loading pulse animation
 * @param duration - Animation duration in seconds
 * @returns Framer Motion variants
 */
export function loadingPulse(duration: number = 1.5): Variants {
  return {
    pulse: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
}

/**
 * Page transition animation
 * @param direction - Direction of transition ('horizontal', 'vertical')
 * @returns Framer Motion variants
 */
export function pageTransition(
  direction: "horizontal" | "vertical" = "horizontal"
): Variants {
  const offset = direction === "horizontal" ? { x: 100 } : { y: 100 };

  return {
    initial: { opacity: 0, ...offset },
    in: { opacity: 1, x: 0, y: 0 },
    out: {
      opacity: 0,
      ...{
        x: direction === "horizontal" ? -100 : 0,
        y: direction === "vertical" ? -100 : 0,
      },
    },
  };
}
