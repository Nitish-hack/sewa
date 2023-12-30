import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from "./table";


// import "./App.css"
import "./styles.css";


const App = () => {
  return (
    <div className="App"> 
  
  <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Table />} />  
      </Routes>
      <ToastContainer />
    </BrowserRouter>
      
    </div>
   
  )
}




export default App