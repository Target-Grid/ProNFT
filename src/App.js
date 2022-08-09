
import './App.css';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import MintNfts from './pages/MintNfts';
import Register_Company from './pages/Register_Company';
import Multiple_qr from './pages/QRList';
import Productdetail from './pages/Productdetail';
import LoginMetamask from './pages/LoginMetamask';
import Navbar from './pages/Navbar';
import React,{useState,useEffect} from 'react'

function App() {
  const[qrurllist,setqrurllist]=useState([]) 
  
  return (
    

    <BrowserRouter>
    
      <Navbar  />
      <Routes>
        <Route path="/registercompany" element={<Register_Company />} />
        <Route path="/mintnfts" element={<MintNfts  qrurllist={qrurllist}/>} />
        <Route path="/qrlist" element={<Multiple_qr arr={qrurllist} />} />
        <Route path="/pruductdetail" element={<Productdetail/>} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
