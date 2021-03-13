import Head from 'next/head';
import Link from 'next/link';

import Header from '@components/Header';

import useWorksoutData from '@utilities/useWorksoutData';

import styles from './Program.module.css';


export default function Programs() {
  const [worksouts, setWorksouts] = useWorksoutData();

  return (
    <>
      <Head>
        <title>Worksouts - Program</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header title='Program' />

      <div className='textAlign--center'>
        <button>Start</button>
      </div>

      <main>
        <ul>
          <li className={styles.item}>
            <div className='flex m-bottom--16'>
              <img src='/netliheart.svg' alt='exercise image' className='m-right--16' width={40} height={40} />
              <h2 className={styles.itemName}>Exercise Name</h2>
            </div>

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Reps</th>
                  <th>Lbs.</th>
                  <th>Rest</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>5</td>
                  <td>75</td>
                  <td>1:30</td>
                  <td><input type='checkbox' /></td>
                </tr>
              </tbody>
            </table>
          </li>
        </ul>
      </main>
    </>
  )
}
