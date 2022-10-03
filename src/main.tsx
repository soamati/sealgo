import "@fontsource/jost";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { DataProvider } from "./context/DataProvider";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider resetCSS theme={theme}>
    <DataProvider>
      <App />
    </DataProvider>
  </ChakraProvider>
);
