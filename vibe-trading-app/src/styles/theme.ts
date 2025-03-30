// FTX Brand Colors
export const colors = {
  // Teal Shades
  teal: {
    "900": "#002E3D",
    "800": "#004054",
    "700": "#00566B",
    "600": "#007994",
    "500": "#00A2C7",
    "400": "#3EC7E3",
    "300": "#7CE8FE",
    "200": "#B3F2FF",
    "100": "#D6F8FF",
    "0": "#EBFBFF",
  },
  // Grey Shades
  grey: {
    "900": "#14121E",
    "800": "#262334",
    "700": "#444054",
    "600": "#615F6D",
    "500": "#7B7986",
    "400": "#A8A7AE",
    "300": "#D7D6DB",
    "200": "#EFEFF0",
    "100": "#F7F7F8",
    "0": "#FFFFFF",
  },
  // Semantic Colors
  semantic: {
    primary: "#00A2C7", // Teal 500
    primaryLight: "#3EC7E3", // Teal 400
    primaryDark: "#007994", // Teal 600
    secondary: "#FF4D4F", // Ask/Red
    background: "#14121E", // Grey 900
    surface: "#262334", // Grey 800
    text: {
      primary: "#FFFFFF", // Grey 000
      secondary: "#D7D6DB", // Grey 300
    },
    border: "rgba(255, 255, 255, 0.1)",
    overlay: {
      light: "rgba(255, 255, 255, 0.05)",
      medium: "rgba(255, 255, 255, 0.08)",
      dark: "rgba(255, 255, 255, 0.1)",
    },
  },
};

// Common Styles
export const styles = {
  // Layout
  layout: {
    container: {
      backgroundColor: colors.semantic.background,
      minHeight: "100vh",
    },
    banner: {
      backgroundColor: colors.semantic.primary,
      padding: "8px 16px",
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 1000,
    },
    content: {
      marginTop: "56px", // Height of banner
      padding: "16px",
    },
  },
  // Components
  components: {
    card: {
      backgroundColor: colors.semantic.surface,
      borderRadius: "12px",
      border: `1px solid ${colors.semantic.border}`,
    },
    button: {
      primary: {
        backgroundColor: colors.semantic.primary,
        color: colors.semantic.text.primary,
        "&:hover": {
          backgroundColor: colors.semantic.primaryDark,
        },
      },
      secondary: {
        backgroundColor: colors.semantic.secondary,
        color: colors.semantic.text.primary,
      },
    },
    textField: {
      root: {
        "& .MuiOutlinedInput-root": {
          backgroundColor: colors.semantic.overlay.light,
          "&:hover": {
            backgroundColor: colors.semantic.overlay.medium,
          },
          "&.Mui-focused": {
            backgroundColor: colors.semantic.overlay.dark,
          },
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.semantic.border,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.semantic.overlay.medium,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.semantic.primary,
        },
      },
    },
    chat: {
      container: {
        backgroundColor: colors.semantic.surface,
        border: `1px solid ${colors.semantic.border}`,
      },
      header: {
        backgroundColor: colors.semantic.overlay.light,
        borderBottom: `2px 1px solid ${colors.semantic.border}`,
        // <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
      },
      message: {
        user: {
          backgroundColor: colors.semantic.primary,
          boxShadow: `0 4px 12px ${colors.semantic.primary}33`,
        },
        assistant: {
          backgroundColor: colors.semantic.surface,
          border: `1px solid ${colors.semantic.border}`,
        },
      },
      input: {
        container: {
          backgroundColor: colors.semantic.overlay.light,
          borderTop: `1px solid ${colors.semantic.border}`,
        },
      },
    },
  },
};
