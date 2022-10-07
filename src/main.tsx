import "@fontsource/jost";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { DataProvider } from "./context/DataProvider";
import { SpeedProvider } from "./context/SpeedProvider";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Button: {
      defaultProps: {
        size: ["sm", "md"],
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider resetCSS theme={theme}>
    <DataProvider>
      <SpeedProvider>
        <App />
      </SpeedProvider>
    </DataProvider>
  </ChakraProvider>
);
