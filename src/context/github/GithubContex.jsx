import { createContext, useReducer } from 'react';
import githubReducer from './Githubreducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

//provider function
export const GithubProvider = ({ children }) => {
  /*   const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); */

  const initialState = {
    users: [],
    loading: false
  };

  //useReducer
  const [state, dispatch] = useReducer(githubReducer, initialState);

  //Set Loading
  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  /* //Fetch Users (for testing , gets initial users)
  const fetchUsers = async () => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });

    const data = await response.json();
    dispatch({
      type: 'GET_USERS',
      payload: data
    });
  }; */

  //Search Users
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });

    const { items } = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: items
    });
  };

  //clear Users
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
