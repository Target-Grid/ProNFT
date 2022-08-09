import React from 'react'
import { useState } from 'react'
import { Buffer } from 'buffer'
import ipfs from '../Ipfs'
import { loadBlockchain } from '../components/BlockchainLoad'
import LoadingSpinner from '../components/LoadingSpinner'
import './Register_Company.css'

const Register_Company = () => {

  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { accounts, pronft } = await loadBlockchain()
    await pronft.methods.registercompany(chash, caccount).send({ from: accounts[0] })
    setIsLoading(false);
    alert("company registered!!!")
    console.log(chash)
    console.log(caccount)
  }

  const handleChange = async (e) => {
    e.preventDefault();

    const file = e.target.files[0]

    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const res = Buffer.from(reader.result)
      setbuffer(res)

    }


  }

  const handleChange2 = async (e) => {
    e.preventDefault();
    setrecaccount(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const created = await ipfs.add(buffer);
      setchash(created.path);
    }

    catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  }

  const [caccount, setrecaccount] = useState('')
  const [chash, setchash] = useState('')
  const [buffer, setbuffer] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>

      {isLoading ?
        <LoadingSpinner />
        : <div className='rcmain'>
          <div className='rcup'>
            <h2>Register Company</h2>
            <form onSubmit={handleSubmit}>

              <div>
                <label>Upload Company Document : </label>
                <input type='file' onChange={handleChange}></input>
              </div>
              <div>
                <button>Submit Details</button>
              </div>
              <div>
                
                <input placeholder='Company Details Hash' className='rcinp' type='text' value={chash} readOnly></input>
              </div>

            </form>
          </div>
          <div className='rcdown'>
            <form onSubmit={register}>
              <h3>Don't have metamask account</h3>
              <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/related" target="_blank">Set Up Metamask</a>
              <div>
                
                <input placeholder='Company Account' className='rcinp' type='text' value={caccount} onChange={handleChange2}></input>
              </div>
              <div>
                <button>Register Company</button>
              </div>
            </form>

          </div>
        </div>
      }
    </>
  )
}

export default Register_Company