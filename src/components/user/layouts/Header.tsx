import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X } from "lucide-react";
import { ThemeMode } from "./ThemeMode";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full px-6 py-4 bg-white dark:bg-[#1a1a1a] shadow-md">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <a href="/" className="text-xl font-bold text-black dark:text-white">
          ShopLogo
        </a>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <Input
            type="search"
            placeholder="Search products..."
            className="px-4 py-2"
          />
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            <a href="/" className="hover:text-black dark:hover:text-white">
              Home
            </a>
            <a
              href="/products"
              className="hover:text-black dark:hover:text-white"
            >
              Products
            </a>
            <a href="/about" className="hover:text-black dark:hover:text-white">
              About
            </a>
          </nav>

          <ThemeMode />

          {/* Mobile Hamburger Button */}
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-2 px-6 flex flex-col gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Input
            type="search"
            placeholder="Search products..."
            className="mb-2"
          />
          <a href="/" className="hover:text-black dark:hover:text-white">
            Home
          </a>
          <a
            href="/products"
            className="hover:text-black dark:hover:text-white"
          >
            Products
          </a>
          <a href="/about" className="hover:text-black dark:hover:text-white">
            About
          </a>
        </nav>
      )}
    </header>
  );
}

export { Header };
