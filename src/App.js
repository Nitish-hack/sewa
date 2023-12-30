import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
//components
import Navbar from './components/Navbar';
import Login from "./components/login/Login"
import Signup from "./components/signup/Signup"
import Table from "./table";
import ErrorPage from './components/ErrorPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import "./App.css"
import "./styles.css";


const App = () => {

  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>

    </div>

  )
}




export default App