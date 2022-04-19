import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Button from '@mui/material/Button';
import Modal from '../components/Modal/Modal';

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
       <h1>This is where the dashboard is!</h1>
       <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Modal isOpen={isOpen} handleClose={handleClose} />
       <Link href="/">
          Go to the HomePage
      </Link>
      </main>
      
    </div>
  )
}

export default Home
