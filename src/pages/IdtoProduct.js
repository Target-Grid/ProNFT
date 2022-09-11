import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const IdtoProduct = () => {

  const [wstring, setwstring] = useState('')
  const [started, setstarted] = useState('')
  const handlechange = async (e) => {
    e.preventDefault();
    setwstring(e.target.value)
  }

  const handlesubmit = async () => {
    console.log(wstring)
  }

  return (
    <div>
  
      <form onSubmit={handlesubmit} className='frmofpro'>
      <h1>Enter the Product Id got through product</h1>
        <input type="text" value={wstring} placeholder='Enter Product ID' onChange={handlechange} />
        <br></br>
        <Link to="/userproduct" state={{ data: wstring }}>
          Get Details
        </Link>

      </form>

    </div>
  )

}

export default IdtoProduct
