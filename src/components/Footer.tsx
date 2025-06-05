
import { Heart, Code } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary/90 via-primary to-primary/90 text-white py-8 mt-auto border-t border-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Main attribution */}
          <div className="flex items-center justify-center gap-2 animate-fade-in">
            <Code className="text-accent animate-pulse h-5 w-5" />
            <p className="text-lg font-medium bg-gradient-to-r from-white via-accent to-secondary bg-clip-text text-transparent">
              Made by <span className="font-bold">PortfolioX_studios</span>
            </p>
            <Code className="text-accent animate-pulse h-5 w-5" />
          </div>
          
          {/* Secondary attribution */}
          <div className="flex items-center justify-center gap-2 animate-fade-in">
            <span className="text-sm text-muted-foreground">Crafted with</span>
            <Heart className="text-red-500 animate-pulse h-4 w-4" />
            <span className="text-sm text-muted-foreground">by Riju Rahaman</span>
          </div>
          
          {/* Copyright */}
          <div className="text-center space-y-2 animate-fade-in">
            <p className="text-sm text-muted-foreground/80">
              © {new Date().getFullYear()} DWPS Community Service Club. All rights reserved.
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
