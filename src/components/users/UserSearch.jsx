import React, { useContext, useState } from 'react';

import AlertContext from '../../context/aleart/AlertContext';
import GithubContext from '../../context/github/GithubContex';
import { searchUsers } from '../../context/github/GithubActions';

function UserSearch() {
  const [text, setText] = useState('');

  /* Without Refoctoring   
const { users, searchUsers, clearUsers } = useContext(GithubContext); */
  const { users, dispatch } = useContext(GithubContext);

  const { setAlert } = useContext(AlertContext);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === '') {
      setAlert('Please Enter Somethig', 'error');
    } else {
      dispatch({ type: 'SET_LOADING' });

      const users = await searchUsers(text);

      dispatch({
        type: 'GET_USERS',
        payload: users
      });
      setText('');
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input text-black"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn "
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            className="btn btn-ghost btn-lg"
            onClick={() => dispatch({ type: 'CLEAR_USERS' })}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
