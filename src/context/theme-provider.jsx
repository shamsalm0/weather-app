import { createContext, useContext, useEffect, useState } from "react";

// Initial state
const initialState = {
  theme: "system",
  setTheme: () => null,
};

// Create context
const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  // Initialize theme from localStorage or defaultTheme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  // Apply theme to the document
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove existing themes
    root.classList.remove("light", "dark");

    if (theme === "system") {
      // Detect system theme
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    // Apply selected theme
    root.classList.add(theme);
  }, [theme]);

  // Update theme in localStorage and state
  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Custom hook to access theme context
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
