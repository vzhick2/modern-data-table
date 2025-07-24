import type { Config } from "tailwindcss";

// Tailwind CSS v4 - Minimal config with CSS-based theme
const config: Config = {
  // v4 automatically detects dark mode from CSS
  darkMode: "class",
  // Content is now handled in CSS via @theme --source
  content: [], // This will be read from CSS @theme directive
};

export default config;