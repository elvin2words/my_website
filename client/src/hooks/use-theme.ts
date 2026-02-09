import { useTheme as useThemeProvider } from "@/components/theme-provider";

export const useTheme = () => {
  const { theme, setTheme } = useThemeProvider();

  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
  };
};
