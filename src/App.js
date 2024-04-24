// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import ResetPassword from './ResetPassword';
import SignupForm from './SignupForm';
import BusSearchForm from './bussearch';
import MyTransactionForm from './MyTransaction';
import PassengerDetailForm from './PassengerDetails';
import './Form.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/bussearch" element={<BusSearchForm />} />
        <Route path="/myTransaction" element={<MyTransactionForm />} />
        <Route path="/passenger" element={<PassengerDetailForm />} />
      </Routes>
    </Router>
  );
};

export default App;
