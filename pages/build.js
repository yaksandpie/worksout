import { useEffect, useReducer } from 'react';
import Head from 'next/head';

import Header from '@components/Header';

import useWorksoutData from '@utilities/useWorksoutData';

import styles from './Build.module.css';


function reducer(state, action) {
  switch (action.type) {
    case 'updateInput':
      if (action.value.name === 'name') {
        const newState = { ...state };
        newState.exercises[action.value.id].name = action.value.value;
        return newState;
      }

      return {
        ...state,
        currentSet: {
          ...state.currentSet,
          [action.value.name]: action.value.value,
        },
      };
    case 'addSet':
      const newState = { ...state };
      const current = newState.exercises[action.id];
      current.sets = [...current.sets, { ...newState.currentSet, step: current.sets.length}];

      return {
        ...newState,
        currentSet: {
          step: '',
          reps: '',
          weight: '',
          rest: '',
        },
      };
    case 'addExercise':
      return {
        ...state,
        exercises: [
          ...state.exercises,
          {
            id: state.exercises.length,
            name: '',
            sets: [],
          }
        ],
        currentSet: {
          step: '',
          reps: '',
          weight: '',
          rest: '',
        },
      };
    default:
      return state;
  }
};

export default function Build({ id = 0 }) {
  const [worksouts, setWorksouts] = useWorksoutData();
  const [{ exercises, currentSet }, dispatch] = useReducer(reducer, {
    exercises: [
      ...worksouts.programs[id].exercises,
    ],
    currentSet: {
      step: '',
      reps: '',
      weight: '',
      rest: '',
    },
  });

  function inputsHandler(name, value) {
    dispatch({ type: 'updateInput', value: {name, value, id} });
  };

  useEffect(() => {
    if (exercises.length > 1) {
      const newWorksouts = { ...worksouts };
      newWorksouts.programs[id].exercises = [ ...newWorksouts.programs[id].exercises, ...exercises];
      setWorksouts(newWorksouts);
    }
  }, [exercises]);

  return (
    <>
      <Head>
        <title>Worksouts - Build Program</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header title='Build Program' />

      <main>
        <ul className='m-bottom--16'>
          {worksouts.programs[id].exercises.map((exercise) => (
            <li className={styles.item} key={exercise.id}>
              <div className='flex m-bottom--16'>
                <img src='/netliheart.svg' alt='exercise image' className='m-right--16' width={40} height={40} />
                <input
                  type='text'
                  className={styles.itemName}
                  defaultValue={exercise.name}
                  onChange={(e) => inputsHandler('name', e.target.value, exercise.id)}
                />
              </div>

              <table className='m-bottom--16'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Reps</th>
                    <th>Lbs.</th>
                    <th>Rest</th>
                  </tr>
                </thead>
                <tbody>
                  {exercise.sets.map((set) => (
                    <tr key={set.step}>
                      <td>{set.step + 1}</td>
                      <td>{set.reps}</td>
                      <td>{set.weight}</td>
                      <td>{set.rest}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      {exercise.sets.length + 1}
                    </td>
                    <td>
                      <input
                        type='number'
                        defaultValue={currentSet.reps}
                        value={currentSet.reps}
                        onChange={(e) => inputsHandler('reps', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type='number'
                        defaultValue={currentSet.weight}
                        value={currentSet.weight}
                        onChange={(e) => inputsHandler('weight', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type='text'
                        defaultValue={currentSet.rest}
                        value={currentSet.rest}
                        onChange={(e) => inputsHandler('rest', e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button onClick={() => dispatch({ type: 'addSet', id: exercise.id })}>Add Set</button>
            </li>
          ))}
        </ul>

        <button onClick={() => dispatch({ type: 'addExercise' })}>
          Add Exercise
        </button>
      </main>
    </>
  )
}
