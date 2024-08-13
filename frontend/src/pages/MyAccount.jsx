
import React from 'react';
import ClientTable from '../components/ClientTable';
import Navbar from '../components/NavBar';

const MyAccount = () => {
  return (
    <div className="my-account-container">
      <Navbar/>
      <h1 className="my-account">My Account</h1>
      <ClientTable />
    </div>
  );
};

export default MyAccount;
