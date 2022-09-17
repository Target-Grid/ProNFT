import '../App.css'
import React from 'react';
import { loadBlockchain } from '../components/BlockchainLoad';
import { useState, useEffect } from 'react';
import verify from './varified.png'
import LoadingSpinner from '../components/LoadingSpinner';
import { useLocation } from 'react-router-dom';

//import { deflateSync } from 'zlib';

const UserProduct = () => {

  const location = useLocation();


  const getdate = (t) => {
    return new Date(t * 1000);
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

          <div className='imageSection'>
            <img className='pd' src={`https://infura-ipfs.io/ipfs/${nft.imghash}`} />
            <img className='varify' src={verify} />
          </div>
          <div className='detailSection'>
            <div className='innersection'>
              <div className='innersectionchild' >
                <h4 >Product ID: <span>{nft.id}</span> </h4>
                <h3 >   {nft.name} : <span> <span>{nft.cat}</span></span> </h3>
                <h4 > Minter : <span>{nft.minter}</span></h4>
                <h4 > Warranty Duration: <span>{nft.duration} days</span></h4>
                <h4 > Warranty Start Date :{nft.date > 0 ? <i>{getdate(nft.date).toLocaleString()} '(MM/DD/YYYY)' </i> : <i>Not Started Yet</i>}</h4>
                {/* <h4 > Warranty status : {(nft.date === 0) ? <i>Not Started</i> : (((now.getTime() - nft.date) / 86400000) >= nft.duration) ? <i style={{color:"green"}}>Active</i> : <i style={{color:"red"}}>Expired</i>}</h4> */}
                <h4>Warranty Status : {nft.date==0?<b style={{color:"yellow"}}> Not Started Yet</b>:
         (((Math.round(Date.now() / 1000)- nft.date) / 86400) >= nft.duration)?<b style={{color:"red"}} >Expired</b>:<b style={{color:"green"}}>Active</b>
                }
         </h4>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
//1662907279
//1662907772582
export default UserProduct