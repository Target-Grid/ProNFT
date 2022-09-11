import React, { useEffect, useState } from 'react'
import '../App.css';

function Multiple_qr({ arr,secretstringlist }) {
  console.log(arr)


  const [url, seturl] = useState([])
  

  return (
    <div className='qrmain'>
    
      {
        arr.map((url,index) => 
          <div className='qrstyle' key={index}>
            <img src={"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+url} />
            <p>{secretstringlist[index]} <i>(secret code)</i></p>
            <p>{index + 1}</p>
          </div>
        )
      }
     
  
    </div>
  )
}

export default Multiple_qr