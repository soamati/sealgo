import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    body: `Rubik, sans-serif`,
    heading: `Rubik, sans-serif`,
    button: `Rubik, sans-serif`,
  },
  components: {
    Button: {
      defaultProps: {
        size: ["sm", "md"],
      },
    },
  },
});
