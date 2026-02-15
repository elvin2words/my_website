import { useTheme as useThemeProvider, type Theme } from "@/components/theme-provider";

const THEME_ORDER: Theme[] = ["light", "dark", "system"];

export const useTheme = () => {
  const { theme, resolvedTheme, setTheme } = useThemeProvider();

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme: () => {
      const currentIndex = THEME_ORDER.indexOf(theme);
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % THEME_ORDER.length;
      setTheme(THEME_ORDER[nextIndex]);
    },
  };
};
