
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="bg-primary py-4 text-white relative overflow-hidden animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-center w-full animate-text-glow">
          Old Community Service Club
        </h1>
        <ThemeToggle />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-gradient" />
    </header>
  );
}
