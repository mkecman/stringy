import { createTheme } from '@mui/material/styles';

export const themeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#00bcd4',
        },
        secondary: {
            main: '#ffc400',
        }
    },
    typography: {
        fontFamily: 'Open Sans, Verdana, sans-serif',
        fontSize: 14
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    borderRadius: 3,
                    border: 0,
                    color: 'white',
                    height: 48,
                    padding: '0 30px',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: '10px',
                },
                noPadding: {
                    padding: '0px',
                }
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    padding: '0px',
                },
            },
        },
    },
};

export const theme = createTheme(themeOptions);