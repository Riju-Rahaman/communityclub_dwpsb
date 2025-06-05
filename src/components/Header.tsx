
import { ThemeToggle } from "./ThemeToggle";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-primary/95 via-primary to-primary/95 py-6 text-white relative overflow-hidden animate-fade-in backdrop-blur-sm border-b border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-secondary/10 to-accent/10 animate-gradient"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-accent animate-pulse" />
          <h1 className="text-4xl font-bold text-center animate-glow bg-gradient-to-r from-white via-accent to-secondary bg-clip-text text-transparent font-playfair">
            DWPS Community Service Club
          </h1>
          <Sparkles className="h-8 w-8 text-secondary animate-pulse" />
        </div>
        <ThemeToggle />
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </header>
  );
}
