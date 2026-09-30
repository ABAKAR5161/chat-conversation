import { Routes, Route } from "react-router";

import './App.css'
import Home from './pages/home/Home';
import { useState } from "react";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";

function App() {
  const [checkAuth, setCheckAuth] = useState(false);
  return (
    <div
      className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={checkAuth ? <Home /> : <Login />} />
        <Route path="/signup" element={!checkAuth ? <SignUp /> : <Home /> } />
        <Route path="/login" element={!checkAuth ? <Login /> : <Home />} />
      </Routes>
    </div>
   
  );
}

export default App
