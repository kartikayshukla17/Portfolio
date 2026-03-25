// Shared motion constants — the "vibe curve"
// Expo out: quick attack, long luxurious settle (use for entrances)
export const EASE = [0.16, 1, 0.3, 1];

// Gentle ease-out: calm deceleration for UI state changes, hovers, toggles
export const EASE_GENTLE = [0.25, 0.46, 0.45, 0.94];

// Reusable scroll-reveal variants
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE_GENTLE } },
};

// Returns a container variant that staggers children
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});
