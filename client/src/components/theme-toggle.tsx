import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        data-testid="button-theme-toggle"
        className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-chart-2 text-primary-foreground shadow-lg hover-elevate flex items-center justify-center transition-all duration-300 hover:shadow-xl relative"
        title="Toggle theme"
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </button>
      
      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in duration-200">
          <button
            onClick={() => {
              setTheme("light");
              setShowMenu(false);
            }}
            className={`w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-primary/10 transition-colors font-medium ${
              theme === "light" ? "bg-primary/20 text-primary" : ""
            }`}
            data-testid="button-theme-light"
          >
            <Sun className="h-4 w-4" />
            Light
          </button>
          <button
            onClick={() => {
              setTheme("dark");
              setShowMenu(false);
            }}
            className={`w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-primary/10 transition-colors font-medium ${
              theme === "dark" ? "bg-primary/20 text-primary" : ""
            }`}
            data-testid="button-theme-dark"
          >
            <Moon className="h-4 w-4" />
            Dark
          </button>
          <button
            disabled
            className="w-full text-left px-4 py-3 flex items-center gap-2 text-muted-foreground cursor-not-allowed font-medium"
            data-testid="button-theme-system"
          >
            <Monitor className="h-4 w-4" />
            System
          </button>
        </div>
      )}
    </div>
  );
}
