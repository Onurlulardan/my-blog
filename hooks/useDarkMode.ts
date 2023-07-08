import { useEffect } from "react";

const THEME_MODE = "theme-mode";
const defaultTheme = "light";
const darktTheme = "dark";

const useDarkMode = () => {
  const storeThemeLS = (themeMode: string) => {
    localStorage.setItem(THEME_MODE, themeMode);
  };

  const readThemeLS = () => {
    return localStorage.getItem(THEME_MODE) || "";
  };

  const updateTheme = (newTheme: string, previusTheme?: string) => {
    const { classList } = document.documentElement;
    if (previusTheme) classList.remove(previusTheme);
    classList.add(newTheme);
  };

  const toggleTheme = () => {
    const previusTheme = readThemeLS();
    const newTheme = previusTheme === defaultTheme ? darktTheme : defaultTheme;
    updateTheme(newTheme, previusTheme);
    storeThemeLS(newTheme);
  };

  useEffect(() => {
    const oldTheme = readThemeLS();
    if (oldTheme) {
      return updateTheme(oldTheme);
    }

    const runningOnDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (runningOnDarkMode) {
        updateTheme(darktTheme);
        storeThemeLS(darktTheme);
    } else {
        updateTheme(defaultTheme);
        storeThemeLS(defaultTheme);
    }
  }, []);

  return { toggleTheme };
};

export default useDarkMode;
