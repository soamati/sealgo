import "@fontsource/jost";
import "@fontsource/rubik";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { DataProvider } from "./context/DataProvider";
import { SpeedProvider } from "./context/SpeedProvider";
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider resetCSS theme={theme}>
    <DataProvider>
      <SpeedProvider>
        <App />
      </SpeedProvider>
    </DataProvider>
  </ChakraProvider>
);
