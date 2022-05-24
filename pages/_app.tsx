import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles'

const mdTheme = createTheme()

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={mdTheme}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp



/*

some sort of database
payment testing
send and return data from backend




*/
