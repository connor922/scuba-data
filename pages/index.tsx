import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Scuba Data</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to ScubaData!
        </h1>        
        <h2>
        <Link href="/dashboard">
          <a>Go to Dashboard</a>
        </Link>
        </h2>
      </main>
    </div>
  )
}

export default Home
