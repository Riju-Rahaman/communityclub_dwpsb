
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
              Made by{" "}
              <a 
                href="https://portfoliox-studio.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold hover:underline transition-all duration-300 hover:text-accent"
              >
                PortfolioX_studios
              </a>
            </p>
            <Code className="text-accent animate-pulse h-5 w-5" />
          </div>
          
          {/* Secondary attribution */}
          <div className="flex items-center justify-center gap-2 animate-fade-in">
            <span className="text-sm text-white/90 font-medium">Crafted with</span>
            <Heart className="text-red-400 animate-pulse h-4 w-4 drop-shadow-sm" />
            <span className="text-sm text-white/90 font-medium">by</span>
            <a 
              href="https://rijurahaman.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-semibold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent hover:underline transition-all duration-300"
            >
              Riju Rahaman
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-center space-y-3 animate-fade-in">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>
            <p className="text-xs text-white/70 font-light tracking-wide">
              © {new Date().getFullYear()} <span className="font-medium text-white/90">DWPS Community Service Club</span>. All rights reserved.
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent mx-auto"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
