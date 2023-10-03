
import { useContext } from "react";
import { ThemeContext } from "config/context-provider/theme-provider";

export const useTheme = () => {
    return useContext(ThemeContext);
  };