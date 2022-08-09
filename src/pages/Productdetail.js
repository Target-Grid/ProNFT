import React, { useEffect, useState } from 'react'
import '../App.css'
import LoadingSpinner from '../components/LoadingSpinner';
import { loadBlockchain } from '../components/BlockchainLoad';
import varify from './varified.png'

//220504720QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH
//989285490Qmf71fMiAdndRCm24F2fdnvcAS6GkQWWtH6MuTB3QKeDsu
//http://localhost:3000/?642950491QmNzksiy5tH2iMrnpRKVxyPnY9MqpN1dy5imjGj8jnVFEw

const Productdetail = () => {

  useEffect(() => {
    setIsLoading(true)
    console.log(window.location.href)
    const query = (window.location.href).substring((window.location.href).indexOf('?') + 1);
    console.log(query)
    async function fetchData() {
      const { accounts, pronft } = await loadBlockchain()
      const id = await pronft.methods.verifyproduct(query.toString()).call();
      const nftret = await pronft.methods.idtoNFT(id).call();
      const nftdata = JSON.parse(nftret.productdetail);
      const nft = {
        id: nftret.serialno,
        name: nftdata.name,
        cat: nftdata.catagory,
        minter: nftret.minter,
        imghash: nftdata.imghash
      }
      console.log(nft)
      await setnft(nft)
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
  const [nft, setnft] = useState({ id: '', name: '', cat: '', minter: '', imghash: '' })
  return (
    <>
      {isLoading ? <LoadingSpinner /> :
        <div className='productdetail'>
          <img width="300px" src={`https://ipfs.infura.io/ipfs/${nft.imghash}`} className='img-style' />
          {/* <img width="300px" src='https://static.remove.bg/remove-bg-web/b873fb3846d2c3ac1a6c3f89e442a23ac724b440/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png' /> */}
          <img className='vrify' width="50px" src={varify} />
          <p>Product Name: {nft.name}</p>
          <p>Product Catagory: {nft.cat}</p>
          <h2>Minter: {nft.minter}</h2>
          <h2>Product ID: {nft.id}</h2>
          <button>View Company Details</button>
        </div>}
    </>
  )
}

export default Productdetail