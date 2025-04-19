
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="flex items-center justify-center gap-2 animate-fade-in">
          Made with <Heart className="text-red-500 animate-pulse" /> by Riju Rahaman
        </p>
        <p className="text-sm mt-2 animate-fade-in">
          © {new Date().getFullYear()} DWPS Community Service Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
