
import Web3 from 'web3'
import { contract } from './contract'
export const loadBlockchain = async () => {
   if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.getAccounts()
      const address = '0xEa0B111c2dc1B761201AB695d7f5B4AC0ef4a582';
      const pronft = new web3.eth.Contract(contract, address);
      return { accounts, pronft }
   }
   else {
      alert('plz install metamask')
   }
};