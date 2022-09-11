import '../App.css'
import React from 'react';
import { loadBlockchain } from '../components/BlockchainLoad';
import { useState,useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';


const StartWarranty = () => {
  const handlechange=async(e)=>{
        e.preventDefault();
        setwstring(e.target.value)
  }

  const handlesubmit=async(e)=>{
    e.preventDefault();
     setIsLoading(true)
     try{
      const { accounts, pronft } = await loadBlockchain()
      const id=await pronft.methods.startWarranty(wstring).send({from:accounts[0]});
       setid (id);
     }
     catch(e)
     {
      console.log(e,'error has came up!!!!!')
     }
     setIsLoading(false)
  }
  const [isLoading, setIsLoading] = useState(false);
  const[wstring,setwstring]=useState('')
  const[id,setid]=useState(0)

  return (
    <>
    {isLoading ? <LoadingSpinner /> :
    <div>
   
      <form onSubmit={handlesubmit} className='frmofpro'>
      <h1>To Start Warranty - Enter the secret code got through product </h1>
        <input type="text" value={wstring} placeholder='Enter Secret Code' onChange={handlechange} />
        <br></br>
        <button type="submit">Start Warranty & Get Ownership </button>
      </form>
      
        { id>0? <p>Product With ID {id} has transferred!!!</p>:<p></p> }
    
    </div>}
    </>
  )
}

export default StartWarranty
