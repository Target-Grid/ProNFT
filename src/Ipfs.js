import { create } from "ipfs-http-client";
// const projectId = '...'
// const projectSecret = '...'
// const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
// const ipfs = create('https://ipfs.infura.io:5001/api/v0/auth');
// // const ipfsClient = require("ipfs-http-client");





// export default ipfs;
// const ipfsClient = require("ipfs-http-client");

const projectId = '2Ebw5MfTDn4ESiQmsEo9fImoRFV'
const projectSecret = '0647d865aa3da9e3db4e6cd5bbd0d430'



const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',

  headers: {
    authorization: auth
  }
});


export default ipfs;
