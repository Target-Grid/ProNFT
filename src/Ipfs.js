import { create } from "ipfs-http-client";
// const projectId = '...'
// const projectSecret = '...'
// const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
// const ipfs = create('https://ipfs.infura.io:5001/api/v0/auth');
// // const ipfsClient = require("ipfs-http-client");





// export default ipfs;
// const ipfsClient = require("ipfs-http-client");

const projectId = '2Df7j3ThkI59GNuIMAlpAcGrGMF'
const projectSecret = '40c8c19f781f0ecede5a8221e2a5b0fc'



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
