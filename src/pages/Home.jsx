import React from 'react';
import UserResults from '../components/users/UserResults';
import UserSearch from '../components/users/UserSearch';

//Home Page
function Home() {
  return (
    <>
      <UserSearch />
      <UserResults />
    </>
  );
}

export default Home;
