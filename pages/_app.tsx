import { createTheme, ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

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
today

1) save changes for campaign

tommorrow 

2) tidy up the stucture to not be so deeply nest for the campaigns
4) archieved should be disabled version 

fun

7) payment testing
*/
