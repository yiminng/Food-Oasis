import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // blue
      light: "#1976d2",
      main: "#336699",
      dark: "#0A3865",
      contrast: "#ffffff",
    },
    secondary: {
      // orange
      light: "#f9c058",
      main: "#E57109",
      contrast: "#fff",
    },
    tertiary: {
      // green
      light: '#C7F573',
      main: '#BCE76D',
      contrast: '#fff',
    },
    error: {
      // red
      main: "#f94040",
      contrast: "#000000",
    },
    text: {
      primary: "#313233",
    },
    inactive: {
      // grey
      main: '#545454',
      light: '#f1f1f1',
    }
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif;',
  },
});

const { primary } = theme.palette;

theme.overrides = {
  MuiButton: {
    outlined: {
      border: `2px solid ${primary.main}`,
      color: primary.main,
      "&:hover": {
        color: primary.contrast,
        backgroundColor: primary.main,
      },
    },
  },
  MuiLink: {
    root: {
      color: primary.light,
      "&:visited": {
        color: primary.main,
      },
    },
    underlineHover: {
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  MuiAppBar: {
    root: {
      backgroundColor: "#f1f1f1",
    },
  },
};

export default theme;
