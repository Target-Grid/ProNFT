import '../App.css'
import React from 'react';
import { loadBlockchain } from '../components/BlockchainLoad';
import { useState, useEffect } from 'react';
import jewellery from './jewellery2.jpg'
import LoadingSpinner from '../components/LoadingSpinner';
import { useLocation } from 'react-router-dom';

//import { deflateSync } from 'zlib';

const UserProduct = () => {

  const location = useLocation();


  const getdate=(t)=>{
    return new Date(t*1000);
  }


  useEffect(() => {
    setIsLoading(true)
    async function fetchData() {
      const { accounts, pronft } = await loadBlockchain()
      const nftret = await pronft.methods.idtoNFT(location.state.data).call();
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
     
      setnft(nft)
      console.log(nft)
    }
    try {
      fetchData()
    }
    catch (e) {
      alert(' error occured', e)
    }
    setIsLoading(false)
  }, [])
  const now = new Date() 
  const [isLoading, setIsLoading] = useState(true);
  const [nft, setnft] = useState({ id: '', name: '', cat: '', minter: '', imghash: '', duration: 0, date: '', status: false })

  return (
    <>
      {isLoading ? <LoadingSpinner /> :
          
        <div className='productMain'>
          <div className="cards">
            <div className="card">
              {/* <img src={'https://www.volusion.com/blog/content/images/2021/09/Product-Photography.jpeg'} alt="" /> */}
              <img src={`https://infura-ipfs.io/ipfs/${nft.imghash}`}></img>
              <div className="detail">
                <h4 className='title'>Product ID: {nft.id}</h4>
                <h3 className='price'>   {nft.name} <span> <i> ({nft.cat})</i></span> </h3>
                <h4 className='company'> Minter : {nft.minter}</h4>
                <h4 className='address'> Warranty Duration: {nft.duration} <i>days</i></h4>
                <h4 className='address'> Warranty Start Date :{nft.date>0? <i>{getdate(nft.date).toLocaleString()} </i>:<i>Not Started Yet</i>}</h4>
                <h4 className='address'> Warranty status : {(nft.date===0)?<i>Not Started</i>:(((now.getTime()-nft.date)/86400000) >= nft.duration)?<i>Active</i>:<i>Expired</i>}</h4>
                
              </div>
              <div className='share'>
                
              </div>
              <div className="faltu"></div>
            </div>


          </div>
        </div>
        }
    </>
  )
}

export default UserProduct