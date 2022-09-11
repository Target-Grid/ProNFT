import React, { useEffect, useState } from 'react'
import '../App.css'
import LoadingSpinner from '../components/LoadingSpinner';
import { loadBlockchain } from '../components/BlockchainLoad';
import varify from './varified.png'
import jewellery from './jewellery2.jpg'


const Productdetail = () => {

  useEffect(() => {
    setIsLoading(true)
    
    const query = (window.location.href).substring((window.location.href).indexOf('?') + 1);
    console.log(query)
    async function fetchData() {
      const { accounts, pronft } = await loadBlockchain()
      //get id from the top of browser....1 after clicking proj one from id to product
      const nftret = await pronft.methods.idtoNFT(1).call();
      const nftdata = JSON.parse(nftret.productdetail);

      const nft = {
        id: nftret.serialno,
        name: nftdata.name,
        cat: nftdata.catagory,
        minter: nftret.minter,
        imghash: nftdata.imghash,
        duration:nftret.warrantyperiod,
        date:nftret.starttime,
        status:nftret.warrantystatus
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
  },[])
  const [isLoading, setIsLoading] = useState(true);
  const [nft, setnft] = useState({ id: '', name: '', cat: '', minter: '', imghash: '' ,duration:0,date:'',status:false})
  return (
    <>
      {isLoading ? <LoadingSpinner /> :
        <div className='productdetail'>
       
          {/* <img width="300px" src={`https://ipfs.infura.io/ipfs/${nft.imghash}`} className='img-style' /> */}
          <img width="300px"        src={`https://infura-ipfs.io/ipfs/${nft.imghash}`}     className='img-style' />
          {/* <img width="300px" src={jewellery} /> */}
          <img className='vrify' width="50px" src={varify} />
          <h2>Product ID: {nft.id}</h2>
          <p>Product Name: {nft.name}</p>
          <p>Product Catagory: {nft.cat}</p>
          <h2>Minter: {nft.minter}</h2>
          <p>Warranty Duration : {nft.duration}</p>
          <p>Warranty Start Date : {nft.date}</p>
           <p>warranty Status :{nft.status}</p>
        </div>}
    </>
  )
}

export default Productdetail