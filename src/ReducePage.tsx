import { useReducer } from 'react';
import { Link } from 'react-router-dom';

type Action = {
  type: string;
};

type State = {
  age: number;
};

// ф-я reducer визначає як оновлюється стан, приймає поточний стан та дію (action - це значення чке ми передали в dispatch)
// далі ми можемо винести цю ф-ю в окремий файл і перевикористовувати
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, age: state.age + 1 };
    case 'DECREMENT':
      return { ...state, age: state.age - 1 };
    default:
      return state;
  }
}

export const ReducePage = () => {
  const [state, dispatch] = useReducer(reducer, { age: 22 });

  const handleIncrement = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const handleDecrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <div>
      <div className='mb-6'>
        <nav>
          <ul>
            <li className='uppercase text-blue-600 font-bold'>
              <Link to={'/example2'}>Example-2 &rarr;</Link>
            </li>
          </ul>
        </nav>
      </div>
      <h1 className='text-3xl font-bold mb-4'>Age: {state.age}</h1>
      <button className='text-2xl bg-black rounded-lg px-2 mr-2 w-8 text-white' onClick={handleIncrement}>+</button>
      <button className='text-2xl bg-black rounded-lg px-2 w-8 text-white' onClick={handleDecrement}>-</button>
    </div>
  );
};
