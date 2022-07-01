import React, { createContext, useState } from "react";
import { ThemeProvider, useTheme } from "styled-components";

let _getTheme = ({ primaryColor = {}, secondaryColor = {} }) => ({
  palette: {
    mode: primaryColor.mode || secondaryColor.mode,
    primary: primaryColor,
    secondary: secondaryColor,
    backdrop: "rgba(0,0,0,0.3)",
    error: {
      main: "#d32f2f",
    },
  },
  fonts: ["'Josefin Sans', sans-serif"],
  fontSizes: {
    sm: "1em",
    md: "2em",
    lg: "3em",
  },
  shadows: {
    0: "none",
    12: "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
  },
});

export const context = createContext();

export const useContext = () => ({
  ...React.useContext(context),
  theme: useTheme(),
});

export const Provider = ({ children, value = {} }) => {
  const [theme, setTheme] = useState(
    value.theme || {
      primaryColor: {
        main: "#131313",
        light: "#515151",
        dark: "#333",
        text: "#fff",
        label: "Dark Mode",
        mode: "dark",
      },
      secondaryColor: {
        main: "#00FF00",
        light: "#A3FF90",
        dark: "#009900",
        label: "Green",
        mode: "green",
      },
    }
  );

  return (
    <>
      <context.Provider
        value={{
          setTheme: (theme) => setTheme((prev) => ({ ...prev, ...theme })),
        }}
      >
        <ThemeProvider theme={_getTheme(theme)}>{children}</ThemeProvider>
      </context.Provider>
    </>
  );
};
