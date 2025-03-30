'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { colors, styles } from '@/styles/theme';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: colors.semantic.primary,
            light: colors.semantic.primaryLight,
            dark: colors.semantic.primaryDark,
            contrastText: colors.semantic.text.primary,
        },
        secondary: {
            main: colors.semantic.secondary,
            light: colors.semantic.secondary,
            dark: colors.semantic.secondary,
            contrastText: colors.semantic.text.primary,
        },
        background: {
            default: colors.semantic.background,
            paper: colors.semantic.surface,
        },
        text: {
            primary: colors.semantic.text.primary,
            secondary: colors.semantic.text.secondary,
        },
        error: {
            main: colors.semantic.secondary,
            light: colors.semantic.secondary,
            dark: colors.semantic.secondary,
        },
        success: {
            main: colors.semantic.primary,
            light: colors.semantic.primaryLight,
            dark: colors.semantic.primaryDark,
        },
        warning: {
            main: colors.semantic.secondary,
            light: colors.semantic.secondary,
            dark: colors.semantic.secondary,
        },
        info: {
            main: colors.semantic.primary,
            light: colors.semantic.primaryLight,
            dark: colors.semantic.primaryDark,
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
        },
        h2: {
            fontWeight: 700,
            fontSize: '2rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: styles.components.card,
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '8px 16px',
                    ...styles.components.button.primary,
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: styles.components.textField,
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    ...styles.components.button.primary,
                },
            },
        },
    },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={styles.layout.banner}>
                <Typography
                    variant="h6"
                    sx={{
                        color: colors.semantic.text.primary,
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                    }}
                >
                    VIBETRADE
                </Typography>
            </Box>
            <Box sx={styles.layout.content}>
                {children}
            </Box>
        </ThemeProvider>
    );
} 