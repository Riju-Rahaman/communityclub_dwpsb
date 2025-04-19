
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="animate-fade-in"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 animate-spin-slow" />
      ) : (
        <Moon className="h-5 w-5 animate-pulse" />
      )}
    </Button>
  );
}
