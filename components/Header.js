import Link from 'next/link'

import styles from './Header.module.css';


export default function Header({ title }) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <img
            src='/netliheart.svg'
            alt='site logo'
            width={50}
            height={50}
          />

          <h1>Worksouts</h1>
        </div>

        <ul className={styles.breadcrumbs}>
          <li>
            <Link href='/programs'>Programs</Link>
          </li>
          <li>
            <Link href='/history'>History</Link>
          </li>
          <li>
            <Link href='/build'>Build</Link>
          </li>
          <li>
            <Link href='/import'>Import</Link>
          </li>
        </ul>
      </header>

      <h1 className={styles.title}>{title}</h1>
    </>
  );
}
