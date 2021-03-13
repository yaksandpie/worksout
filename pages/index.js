import Head from 'next/head';
import Link from 'next/link';

import styles from './Home.module.css';


export default function Home() {
  return (
    <>
      <Head>
        <title>Worksouts - Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.container}>
        <Link href='/programs'>
          <a className={styles.tile}>Programs</a>
        </Link>

        <Link href='/history'>
          <a className={styles.tile}>History</a>
        </Link>

        <Link href='/build'>
          <a className={styles.tile}>Build</a>
        </Link>

        <Link href='/import'>
          <a className={styles.tile}>Import</a>
        </Link>
      </main>
    </>
  );
}
