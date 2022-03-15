import React from 'react';
import UserResults from '../components/users/UserResults';

function Home() {
  return (
    <>
      {console.log(process.env.REACT_APP_GITHUB_TOKEN)}
      <UserResults />
    </>
  );
}

export default Home;
