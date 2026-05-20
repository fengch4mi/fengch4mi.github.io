export const createFadeInUp = (distance = 20, duration = 0.5) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -distance },
  transition: { duration }
});

export const createFadeIn = (duration = 0.5) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration }
});

export const createScaleIn = (scale = 0.9, duration = 0.5) => ({
  initial: { opacity: 0, scale },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale },
  transition: { duration }
});

export const createStagger = (stagger = 0.1) => ({
  animate: { transition: { staggerChildren: stagger } }
});
