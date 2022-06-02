import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles'
import { supabase } from "../libs/initSupabase";
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


const allowedPages = ['/', 'sign-up']
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
1) hydration issue
2) fails on save of settings
3) 
2) tidy up the stucture to not be so deeply nest for the campaigns
3) archieve button should be seperate from the trio toggle
4) archieved should be disabled version 
5) on keydown add
6) save changes button for campaign
7) payment testing
8) 
9) 
*/

    // const [user, setUser] = useState<User | null>();
    // const router = useRouter()

    // useEffect(() => {
    //     if(!user && router.pathname !== "/"){

    //     const getProfile = () => {
    //       const profile = supabase.auth.user();
    
    //       if (profile) {
    //         setUser(profile);
    //       } else {
    //         router.push('/');
    //       }
    //     };
    
    //         getProfile();
    //     }
    // }, []);
    
    // if (!user && router.pathname !== "/" ) {
    //     // Currently loading asynchronously User Supabase Information
    //     return null;
    // }