import { useState } from 'react';

import useLocalStorage from '@utilities/useLocalStorage';


const model = {
  name: '',
  programs: [
    {
      id: 0,
      name: '',
      exercises: [
        {
          id: 0,
          name: '',
          sets: [],
        },
      ],
    },
  ],
};

export default function useWorksoutData() {
  const [worksouts, setWorksouts] = useLocalStorage('worksouts-data', model);
  return [worksouts, setWorksouts, model];
}