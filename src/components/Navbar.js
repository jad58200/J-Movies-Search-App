import React from "react";
import { Moon, Sun } from "lucide-react";

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">🎬 J Movies</h1>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
      </button>
    </nav>
  );
};

export default Navbar;
