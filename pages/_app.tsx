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
2) tidy up the stucture to not be so deeply nest for the campaigns
3) archieve button should be seperate from the trio toggle
4) archieved should be disabled version 
5) on keydown add
6) save changes button for campaign
7) payment testing
8) some sort of database
9) send and return data from backend
*/
