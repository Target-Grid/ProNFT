import React, { useEffect, useState } from 'react'
import '../App.css'
import LoadingSpinner from '../components/LoadingSpinner';
import { loadBlockchain } from '../components/BlockchainLoad';
import varify from './varified.png'
import jewellery from './jewellery2.jpg'


const Productdetail = () => {
  const getdate = (t) => {
    return new Date(t * 1000);
  }
  const now = new Date()
  useEffect(() => {
    setIsLoading(true)

    const query = (window.location.href).substring((window.location.href).indexOf('?') + 1);
    console.log(query)
    async function fetchData() {
      const { accounts, pronft } = await loadBlockchain()
      //get id from the top of browser....1 after clicking proj one from id to product
      const id=await pronft.methods.verifyproduct(query).call();
      const nftret = await pronft.methods.idtoNFT(id).call();
      const nftdata = JSON.parse(nftret.productdetail);

      const nft = {
        id: nftret.serialno,
        name: nftdata.name,
        cat: nftdata.catagory,
        minter: nftret.minter,
        imghash: nftdata.imghash,
        duration: nftret.warrantyperiod,
        date: nftret.starttime,
        status: nftret.warrantystatus
      }

      console.log(nft)
      setnft(nft)

    }
    try {
      fetchData()
    }
    catch (e) {
      alert(' error occured', e)
    }
    setIsLoading(false)
  }, [])
  const [isLoading, setIsLoading] = useState(true);
  const [nft, setnft] = useState({ id: '', name: '', cat: '', minter: '', imghash: '', duration: 0, date: '', status: false })
  return (
    <>
      {isLoading ? <LoadingSpinner /> :
        <div className='productdetail'>

          {/* <img width="300px" src={`https://ipfs.infura.io/ipfs/${nft.imghash}`} className='img-style' /> */}
          <img width="300px" src={`https://infura-ipfs.io/ipfs/${nft.imghash}`} className='img-style' />
          {/* <img width="300px" src={jewellery} /> */}
          <img className='vrify' width="50px" src={varify} />
          <h2>Product ID: {nft.id}</h2>
          <p>Product Name: {nft.name}</p>
          <p>Product Catagory: {nft.cat}</p>
          <h2>Minter: {nft.minter}</h2>
          <p>Warranty Duration : {nft.duration} days</p>
        <p>  Warranty Start Date :{nft.date > 0 ? <i>{getdate(nft.date).toLocaleString()} '(MM/DD/YYYY)' </i> : <i>Not Started Yet</i>}</p>
          {/* <p>  Warranty status : {(nft.date ==0) ? <i>Not Started</i> : ((((now.getTime() - nft.date) / 86400000) >= nft.duration) ? <i style={{color:"green"}}>Active</i> : <i style={{color:"red"}}>Expired</i> )}</p> */}

         <p> Warranty Status : {nft.date==0?<b style={{color:"yellow"}}>Not Started Yet</b>:
         (((Math.round(Date.now() / 1000)- nft.date) / 86400) >= nft.duration)?<b style={{color:"red"}}>Expired</b>:<b style={{color:"green"}}>Active</b>
         
         
         }



         
         
         </p>




          
        </div>}
    </>
  )
}

export default Productdetail