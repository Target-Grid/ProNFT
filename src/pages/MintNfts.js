import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState, useEffect } from 'react'
import { Buffer } from 'buffer';
import ipfs from '../Ipfs';
import { loadBlockchain } from '../components/BlockchainLoad';
import LoadingSpinner from '../components/LoadingSpinner';
import Multiple_qr from './QRList';
const MintNfts = ({ qrurllist }) => {

  const handlechange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    setnft({ ...nft, [name]: e.target.value });
  }

  const handlecountchange = (e) => {
    e.preventDefault()

    setcount(e.target.value)

  }

  const handleImgchange = async (e) => {
    const file = e.target.files[0]
    const name = e.target.value;
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const res = Buffer.from(reader.result)
      setbuffer(res)


    }

  }



  const callblockchain = async (count, nftlist, qrhashlist) => {
    const { accounts, pronft } = await loadBlockchain()
    await pronft.methods.mintNFTs(count, nftlist, qrhashlist).send({ from: accounts[0] })
    console.log(count)
    console.log(nftlist)
    console.log(qrhashlist)
    console.log(qrurllist)
    toast.success('Mint NFT Added', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  }



  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const created = await ipfs.add(buffer);

      const minter = '0x7177Ff92877547A613a5A77f9f7E9571b2126f8C'

      nft.imghash = created.path
      nft.minter = minter

      let strnft = JSON.stringify(nft)



      for (let i = 0; i < count; i++) {
        nftlist.push(strnft)
        const no = Math.floor(Math.random() * 100000000);
        const str = no.toString() + i.toString() + nft.imghash
        qrhashlist.push(str)
        qrurllist.push('http://localhost:3000/pruductdetail?' + str)
      }

      await callblockchain(count, nftlist, qrhashlist)

      setcount(0)
      setnftlist([])
      setqrhashlist([])
      setbuffer('')
      setnft({ name: '', catagory: '', imghash: '', minter: '' })

    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false)

  }




  const [nft, setnft] = useState({ name: '', catagory: '', imghash: '', minter: '' })
  const [nftlist, setnftlist] = useState([])
  const [buffer, setbuffer] = useState('')
  const [qrhashlist, setqrhashlist] = useState([])
  const [count, setcount] = useState()

  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <ToastContainer />
      {isLoading ? <LoadingSpinner /> :
        <div className='mnftmain'>
          <h2>MintNfts</h2>


          <form onSubmit={handleSubmit2}>


            <div>
              <label>Choose Image of product : </label>
              <input type='file' onChange={handleImgchange}></input>
            </div>

            <div>
              {/* <label>name of Product :</label> */}
              <input className='rcinp' placeholder='Name Of Product' type='text' value={nft.name} onChange={handlechange} name='name'></input>
            </div>


            <div>
              {/* <label>Catagory of Product :</label> */}
              <input placeholder='Category of Product' className='rcinp' type='text' value={nft.catagory} onChange={handlechange} name='catagory'></input>
            </div>

            <div>
              {/* <label>Count of Product :</label> */}
              <input placeholder='Number of Product' className='rcinp' type='number' value={count} onChange={handlecountchange} ></input>
            </div>

            <button>Mint Nfts</button>
          </form>
        </div>}
      {/* <Multiple_qr arr={qrurllist}/> */}
    </>
  )
}

export default MintNfts