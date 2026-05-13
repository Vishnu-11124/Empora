import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Navbar from './components/Navbar';
import Dashboard from './page/dashboard/Dashboard';
import AddEmployee from './page/dashboard/AddEmployee';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="admin/dashboard" element={<Dashboard />}>
          <Route path="add-employee" element={<AddEmployee />} />

        </Route>
      </Routes>
    </div>
  );
};

export default App;
