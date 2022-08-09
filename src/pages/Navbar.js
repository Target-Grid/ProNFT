import {
    NavLink
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import './Nav.css'
import logoUrl from '../logonft.jpg'
import Web3 from "web3";
import { useEffect, useState } from "react";


const Navigation = () => {
    const [account, setAccount] = useState('Connect Wallet')

    useEffect(()=>{
        web3Handler()
    })

    const web3Handler=async()=>{
    
       await  window.web3.currentProvider.request({method:'eth_requestAccounts'}).then(accounts=>{
        setAccount(accounts[0]);
        }).catch(()=>{
            setAccount('Connect Wallet')
        })

    }

   

    return (

        <div className="nav">
            <input type="checkbox" id="nav-check" />
            <div className="nav-header">
                <div className="nav-title">
                <img width="50px"  src={logoUrl}></img>
                    
                </div>
            </div>
            <div className="nav-btn">
                <label htmlFor="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>

            <div className="nav-links">
                <NavLink to="/registercompany" >
                    Register Company
                </NavLink>
                <NavLink to="/mintnfts" >
                    Mint Nfts
                </NavLink>
                <NavLink to="/qrlist" >
                    QR List
                </NavLink>
                 
                        <button onClick={web3Handler} className="walletbtn">
                            {account.slice(0, 5) + '...' + account.slice(38, 42)}
                        </button>
                       
                   
            </div>
        </div>


        // <Navbar expand="lg" bg="secondary" variant="dark">
        //     <Container>

        //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        //         <Navbar.Collapse id="responsive-navbar-nav">
        //             <Nav className="me-auto">
        //                 <Nav.Link as={Link} to="/registercompany">Home</Nav.Link>
        //                 <Nav.Link as={Link} to="/mintnfts">Generate QR</Nav.Link>
        //                 <Nav.Link as={Link} to="/qrlist">QR List</Nav.Link>

        //             </Nav>
        //             <Nav>
        //                 {account ? (
        //                     <Nav.Link
        //                         href={`https://etherscan.io/address/${account}`}
        //                         target="_blank"
        //                         rel="noopener noreferrer"
        //                         className="button nav-button btn-sm mx-4">
        //                         <Button variant="outline-light">
        //                             {account.slice(0, 5) + '...' + account.slice(38, 42)}
        //                         </Button>

        //                     </Nav.Link>
        //                 ) : (
        //                     <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
        //                 )}
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
    )

}

export default Navigation;