import { Routes, Route } from "react-router";
import { useEffect } from "react";

import './App.css'
import Home from './pages/home/Home';
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import useStoreAuth from "./store/useAuth";


function App() {
  const { authUser, checkAuth, isCheckingAuth } = useStoreAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center p-4" role="status">
        Vérification de la session...
      </div>
    );
  }

  return (
    <main className="flex min-h-[100dvh] w-full items-center justify-center p-0 sm:p-4">
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Login />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Home /> } />
        <Route path="/login" element={!authUser ? <Login /> : <Home />} />
      </Routes>
    </main>
   
  );
}

export default App
