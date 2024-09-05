import React from 'react';
import Home from './Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing';
import RetrievePassword from './Components/RetrievePassword';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element ={<Login/>}/>
          <Route exact path="/" element={<Home />} />
          <Route path="/generate-password" element={<Landing />} />
          <Route path="/retrieve-password" element={<RetrievePassword />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
