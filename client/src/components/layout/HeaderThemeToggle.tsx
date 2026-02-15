import { Check, Monitor, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme";

interface HeaderThemeToggleProps {
  buttonClassName?: string;
  align?: "start" | "center" | "end";
}

function ThemeStateIcon({ theme }: { theme: "light" | "dark" | "system" }) {
  if (theme === "light") {
    return <Sun className="h-5 w-5" />;
  }
  if (theme === "dark") {
    return <Moon className="h-5 w-5" />;
  }
  return <Monitor className="h-5 w-5" />;
}

export default function HeaderThemeToggle({
  buttonClassName,
  align = "end",
}: HeaderThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={buttonClassName}
          aria-label="Theme menu"
          title="Choose theme"
        >
          <ThemeStateIcon theme={theme} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className="w-40 border-white/20 bg-primary/95 text-white backdrop-blur-md"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="hover:bg-white/10 focus:bg-white/10 focus:text-white"
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
          {theme === "light" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="hover:bg-white/10 focus:bg-white/10 focus:text-white"
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
          {theme === "dark" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="hover:bg-white/10 focus:bg-white/10 focus:text-white"
        >
          <Monitor className="h-4 w-4" />
          <span>System</span>
          {theme === "system" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
