import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: "fixed",
      },
      styleOverrides: {
        root: {
          height: 60,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: "3rem",
          fontWeight: 700,
        },
        h2: {
          fontSize: "2.5rem",
          fontWeight: 600,
        },
        h3: {
          fontSize: "2.1rem",
          fontWeight: 550,
        },
        h4: {
          fontSize: "1.5rem",
          fontWeight: 500,
        },
        h5: {
          fontSize: "1.25rem",
          fontWeight: 400,
        },
        h6: {
          fontSize: "1rem",
          fontWeight: 400,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "outlined",
        size: "small",
        disableElevation: true,
        color: "info",
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "none",
          textTransform: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: "0px 5px 5px rgba(0,0,0,0.05)",
          borderRadius: "10px",
        },
      },
    },
  },
});
