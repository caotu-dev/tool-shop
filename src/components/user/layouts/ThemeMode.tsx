import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

function ThemeMode() {
  const currentMode = localStorage.getItem("mode");
  const isDarkMode = currentMode === "dark";
  const [darkMode, setDarkMode] = useState(isDarkMode);

  useEffect(() => {
    toggleDarkMode(darkMode);
  }, [darkMode]);

  const toggleDarkMode = (isDarkMode: boolean) => {
    const mode = isDarkMode ? "dark" : "light";
    localStorage.setItem("mode", mode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  };

  toggleDarkMode(isDarkMode);

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle theme"
    >
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

export { ThemeMode };
