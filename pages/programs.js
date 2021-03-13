import Head from 'next/head';
import Link from 'next/link';

import Header from '@components/Header';

import useWorksoutData from '@utilities/useWorksoutData';

import styles from './Programs.module.css';


export default function Programs() {
  const [worksouts, setWorksouts, model] = useWorksoutData();
  console.log(worksouts)
  function nameHandler(value, id) {
    const newWorksouts = { ...worksouts };
    newWorksouts.programs[id].name = value;
    setWorksouts(newWorksouts);
  }

  function addProgram() {
    setWorksouts({
      ...worksouts,
      programs: [
        ...worksouts.programs,
        {
          ...model.programs,
          id: worksouts.programs.length,
        },
      ],
    });
  };

  return (
    <>
      <Head>
        <title>Worksouts - Programs</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header title='Programs' />

      <main>
        <ul className='m-bottom--16'>
          {worksouts.programs.map((program) => (
            <li className={styles.item} key={program.id}>
              <div className='flex gap--8 m-bottom--16'>
                <input
                  type='text'
                  className={styles.itemName}
                  defaultValue={program.name}
                  onChange={(e) => nameHandler(e.target.value, program.id)}
                />

                <Link href='/program'>
                  <img src='/netliheart.svg' alt='trash program' width={20} height={20} />
                </Link>
              </div>

              <div>
                <button className='m-right--16'>Start</button>
                <button>Share</button>
              </div>
            </li>
          ))}
        </ul>

        <button onClick={addProgram}>Add Program</button>
      </main>
    </>
  )
}
