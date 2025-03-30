import { extendTheme } from "@chakra-ui/react";

const disabledStyles = {
  _disabled: {
    backgroundColor: "ui.main",
  },
};

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        fontFamily: "'Press Start 2P', cursive",
      },
    },
  },
  colors: {
    ui: {
      main: "#2C5282",
      secondary: "#f0f9ff",
      success: "#48BB78",
      danger: "#E53E3E",
      light: "#26aeeb",
      dark: "#001a24",
      darkSlate: "#252D3D",
      dim: "#A0AEC0",
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          backgroundColor: "ui.main",
          color: "white",
          _hover: {
            backgroundColor: "#2C5282D0",
          },
          _disabled: {
            ...disabledStyles,
            _hover: {
              ...disabledStyles,
            },
          },
        },
        danger: {
          backgroundColor: "ui.danger",
          color: "ui.light",
          _hover: {
            backgroundColor: "#E32727",
          },
        },
      },
    },
    Tabs: {
      variants: {
        enclosed: {
          tab: {
            _selected: {
              color: "ui.main",
            },
          },
        },
      },
    },
  },
});

export default theme;
