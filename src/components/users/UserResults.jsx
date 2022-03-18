import React, { useContext } from 'react';
import GithubContext from '../../context/github/GithubContex';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

function UserResults() {
  const { users, loading } = useContext(GithubContext);

  /* const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //Fetch Users
  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });

    const data = await response.json();
    setUsers(data);
    setLoading(false);
  }; */

  /*   //for testing (displays all users)
  useEffect(() => {
    fetchUsers();
  }, []);
 */
  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
