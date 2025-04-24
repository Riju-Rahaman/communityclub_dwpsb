
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="bg-primary py-4 text-white relative overflow-hidden animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src="/lovable-uploads/6daac8ad-9831-4b81-9404-e0180d347933.png" 
            alt="CSC Club Logo" 
            className="h-12 w-12 object-contain"
          />
          <h1 className="text-3xl font-bold text-center flex-grow animate-text-glow">
            CSC Club
          </h1>
        </div>
        <ThemeToggle />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-gradient" />
    </header>
  );
}
