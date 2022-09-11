
import './App.css';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import MintNfts from './pages/MintNfts';
import Register_Company from './pages/Register_Company';
import Multiple_qr from './pages/QRList';
import Productdetail from './pages/Productdetail';
import StartWarranty from './pages/StartWarranty';
import Navbar from './pages/Navbar';
import React,{useState} from 'react'
import Home from './pages/Home';
import Userpanel from './pages/Userpanel';
import UserProduct from './pages/Userproduct';
import IdtoProduct from './pages/IdtoProduct';


function App() {
  const[qrurllist,setqrurllist]=useState([]) 
  const[secret,setsecret]=useState([])
  return (
    
    <BrowserRouter>
      <Navbar  />
      <Routes>
        <Route path="/idtoproduct" element={<IdtoProduct/>} />
        <Route path="/userproduct" element={<UserProduct/>} />
        <Route path="/userpanel" element={<Userpanel/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/startwarranty" element={<StartWarranty/>} />
        <Route path="/registercompany" element={<Register_Company />} />
        <Route path="/mintnfts" element={<MintNfts  qrurllist={qrurllist} secretstringlist={secret}/>} />
        <Route path="/qrlist" element={<Multiple_qr arr={qrurllist}  secretstringlist={secret}/>} />
        <Route path="/pruductdetail" element={<Productdetail/>} />
        
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
