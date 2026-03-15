/**
 * Phase Information and Tips
 * Easy English explanations for each cycle phase
 */

export const phaseInfo = {
  menstrual: {
    name: "Menstrual Phase",
    icon: "🩸",
    color: "#E94963",
    duration: "3-5 days",
    description:
      "Your body is shedding the uterine lining. Hormone levels (estrogen and progesterone) are at their lowest.",
    bodyChanges: [
      "Mild to moderate cramps possible",
      "Heavier flow early, lighter later",
      "Body temperature slightly lower",
      "May feel more introverted",
    ],
    mood: [
      "Reflective",
      "Introspective",
      "Possibly irritable (PMS carrying over)",
    ],
    energy: "Low",
    tips: [
      "Rest and take it easy",
      "Gentle movement like walking or stretching",
      "Stay warm and hydrated",
      "Get extra sleep if possible",
    ],
    foods: ["Iron-rich foods", "Herbal tea", "Warm soups", "Chocolate (yes!)"],
  },

  follicular: {
    name: "Follicular Phase",
    icon: "🌸",
    color: "#FFB6D9",
    duration: "8-9 days",
    description:
      "Estrogen levels start rising. Your pituitary gland releases FSH (follicle-stimulating hormone) to help follicles develop in the ovaries.",
    bodyChanges: [
      "Energy levels increase",
      "Skin can look clearer and glow",
      "More social and outgoing",
      "Better sleep quality",
      "Improved focus and creativity",
    ],
    mood: [
      "Optimistic",
      "Social",
      "Creative",
      "Confident",
    ],
    energy: "Rising",
    tips: [
      "Start new activities and projects",
      "Great time for exercise and workouts",
      "Socialize and spend time with friends",
      "Focus on creative or important work",
    ],
    foods: ["Fresh vegetables", "Whole grains", "Lean proteins", "Citrus fruits"],
  },

  ovulation: {
    name: "Ovulation",
    icon: "✨",
    color: "#FFD93D",
    duration: "3-4 days (1 day fertile)",
    description:
      "LH (Luteinizing Hormone) surge triggers the release of a mature egg. This is your most fertile window. Estrogen peaks and then drops.",
    bodyChanges: [
      "Slight rise in body temperature",
      "Cervical fluid becomes clearer, stretchy",
      "Possible light spotting",
      "Libido increases",
      "Skin may appear slightly less clear",
    ],
    mood: [
      "Magnetic energy",
      "Confident",
      "Playful",
      "Most attracted to others",
    ],
    energy: "Highest",
    tips: [
      "Best time for intense exercise",
      "Feel confident and social",
      "Good for important conversations",
      "Do activities that make you feel great",
    ],
    foods: ["Leafy greens", "Zinc-rich foods", "Antioxidants", "Fresh fruits"],
  },

  luteal: {
    name: "Luteal Phase",
    icon: "🌙",
    color: "#9B6BA8",
    duration: "10-12 days",
    description:
      "After ovulation, the egg's remaining cells form the corpus luteum, which produces progesterone. If pregnancy doesn't occur, hormone levels drop, triggering menstruation.",
    bodyChanges: [
      "Body temperature stays slightly elevated",
      "Appetite may increase slightly",
      "Water retention possible",
      "Skin may break out slightly",
      "Energy starts to decline mid-phase",
    ],
    mood: [
      "Organized",
      "Practical initially",
      "Possibly more emotional or sensitive late phase",
      "PMS symptoms possible (last 5-7 days)",
    ],
    energy: "Declining",
    tips: [
      "Organize and plan things",
      "Do gentle or strength training",
      "Focus on detailed and important work",
      "Take time for rest and self-care",
    ],
    foods: [
      "Complex carbs",
      "Magnesium-rich foods",
      "Calcium",
      "Omega-3 fatty acids",
    ],
  },
};

export const getPhaseInfo = (phaseName) => {
  const key = phaseName.toLowerCase();
  return phaseInfo[key] || null;
};

export const getCycleOverview = () =>
  "Your menstrual cycle typically lasts 21-35 days, with an average of 28 days. It's divided into four phases: menstrual, follicular, ovulation, and luteal. Understanding your cycle helps you work with your body instead of against it.";
