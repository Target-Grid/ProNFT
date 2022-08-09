
import Web3 from 'web3'
import { contract } from './contract'
export const loadBlockchain = async () => {
   if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.getAccounts()
      const address = '0x9f43C4B208E5104dB3a2eD9B32c27345A4c8a4f0'
      const pronft = new web3.eth.Contract(contract, address);
      return { accounts, pronft }
   }
   else {
      alert('plz install metamask')
   }
};