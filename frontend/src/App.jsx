import { Routes, Route } from "react-router";
import { useEffect } from "react";

import './App.css'
import Home from './pages/home/Home';
import SignUp from "./pages/signup/signUp";
import Login from "./pages/login/Login";
import useStoreAuth from "./store/useAuth";


function App() {
  const { authUser, checkAuth, isCheckingAuth } = useStoreAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="p-4 h-screen flex items-center justify-center" role="status">
        Vérification de la session...
      </div>
    );
  }

  return (
    <div
      className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Login />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Home /> } />
        <Route path="/login" element={!authUser ? <Login /> : <Home />} />
      </Routes>
    </div>
   
  );
}

export default App
