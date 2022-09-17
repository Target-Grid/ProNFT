// import React from 'react'
// import { useEffect, useState } from 'react'
// import { loadBlockchain } from '../components/BlockchainLoad';
// import LoadingSpinner from '../components/LoadingSpinner';
// import '../App.css'
// import { SemanticClassificationFormat } from 'typescript';
// import { Link } from 'react-router-dom'


// const Userpanel = () => {

//     useEffect(() => {
       
//         setIsLoading(true)
    
//         async function fetchData() {
//           const { accounts, pronft } = await loadBlockchain()
//           const nftids= await pronft.methods.usertonft(accounts[0]).call();
// console.log(nftids)
//         for(let i=0;i<nftids.length;i++)
//       {   
//         const nftret = await pronft.methods.idtoNFT(nftids[i]).call();
//         const nftdata = JSON.parse(nftret.productdetail);
//           const nft = {
//             id: nftret.serialno,
//             name: nftdata.name,
//             cat: nftdata.catagory,
//             minter: nftret.minter,
//             imghash: nftdata.imghash,
//             duration:nftret.warrantyperiod,
//             date:nftret.starttime,
//             status:nftret.warrantystatus
//           }
//           console.log(nft)
//           setproducts([...products,nft]) 
//         }}
//         try {
//           fetchData()
//         }
//         catch (e) {
//           alert(' error occured', e)
//         }

//         console.log(products)
//         setIsLoading(false)

//     }, [])

//     const [isLoading, setIsLoading] = useState(true);
//     const [products, setproducts] = useState([])

//     return (
//         <>
//         {isLoading ? <LoadingSpinner /> :
//         <div >
//             <h1 className='proh1'>Products Owned</h1>
//             <div className='pdetail'>
//                 <div class="grid-container">
//                     {
//                         products.map((product) =>
//                             <div key={product.id} class="grid-item">
//                                 <img src={`https://infura-ipfs.io/ipfs/${product.imghash}`} alt={product.imghash} className='proimg' />
//                                 <p>product id :{product.id}</p>
//                                 <p>{product.name}</p>
//                                 <Link to="/userproduct" state={{ data: product.id}}>
//                                  Details
//                                 </Link>

//                             </div>
//                         )
//                     } 
//                 </div>
//             </div>
//         </div>}
//         </>
//     )
// }

// export default Userpanel


import React from 'react'
import { useEffect, useState } from 'react'
import { loadBlockchain } from '../components/BlockchainLoad';
import LoadingSpinner from '../components/LoadingSpinner';
import '../App.css'
import { SemanticClassificationFormat } from 'typescript';
import { Link } from 'react-router-dom'


const Userpanel = () => {

    useEffect(() => {
       
        setIsLoading(true)
    
        async function fetchData() {
          const { accounts, pronft } = await loadBlockchain()
          const nftids= await pronft.methods.usertonft(accounts[0]).call();
console.log(nftids)
const prod=[];
        for(let i=0;i<nftids.length;i++)
      {   
        const nftret = await pronft.methods.idtoNFT(nftids[i]).call();
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
        prod.push(nft)
        }
      setproducts(prod)}
        try {
          fetchData()
        }
        catch (e) {
          alert(' error occured', e)
        }

        console.log(products)
        setIsLoading(false)

    }, [])

    const [isLoading, setIsLoading] = useState(true);
    const [products, setproducts] = useState([])

    return (
        <>
        {isLoading ? <LoadingSpinner /> :
        <div >
            <h1 className='proh1'>Products Owned</h1>
            <div className='pdetail'>
                <div class="grid-container">
                    {
                        products.map((product) =>
                            <div key={product.id} class="grid-item">
                                <img src={`https://infura-ipfs.io/ipfs/${product.imghash}`} alt={product.imghash} className='proimg' />
                                <p>product id :{product.id}</p>
                                <p>{product.name}</p>
                                <Link to="/userproduct" state={{ data: product.id}}>
                                 Details
                                </Link>

                            </div>
                        )
                    } 
                </div>
            </div>
        </div>}
        </>
    )
}

export default Userpanel