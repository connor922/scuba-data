import type { NextPage } from 'next'
import Head from 'next/head'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Container maxWidth="sm">
       <Head>
        <title>Scuba Data</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Box sx={{ my: 4 }}>
      <Typography variant="h1" component="h1" gutterBottom>
        Welcome to ScubaData
      </Typography>
      <Link href="/dashboard">
          Go to the Dashboard
      </Link>
    </Box>
  </Container>
  )
}

export default Home
