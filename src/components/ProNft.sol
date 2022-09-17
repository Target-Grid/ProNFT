//SPDX-License-Identifier: GPL-3.0
//build by ravikant mishra all right reserved
pragma solidity >=0.7.0 <0.9.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract NFTminter is ERC1155,Ownable,ERC1155Holder{
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC1155Receiver) returns (bool) {
        return interfaceId == type(IERC1155).interfaceId
            || interfaceId == type(IERC1155Receiver).interfaceId
            || super.supportsInterface(interfaceId);
    }
 
   
   using Counters for Counters.Counter;
   
   
    address public platform=address(this);
    Counters.Counter private _tokenIds; 
    Counters.Counter private _companyIds; 

    mapping(uint=>NFT)public idtoNFT;  
    mapping(string=>uint) private secrettoid;

    mapping(address=>uint []) private accounttonft; 
    mapping(string=>uint) public QRtoid; 
    mapping(uint=>string)public cidtochash; 
    mapping(address=>uint) public caccounttocid;

    struct NFT{
        uint serialno;
        string productdetail; 
        address minter;
        uint warrantyperiod;
        uint starttime;
        bool warrantystatus;
    }  



     constructor()ERC1155(""){
 
     } 


modifier onlyregisted(address addr)
{
    
    require(caccounttocid[addr]>0,"company not registered");
    _;
}  


function mintNFTs(uint256 counts,string []memory _nftdetail,string []memory QRlist,string [] memory secretstrings,uint warrantyperd) onlyregisted(msg.sender) external{
       uint[] memory ids= new uint[](counts);
       uint[] memory amount = new uint[](counts);
       
      
       for(uint256 i=0;i<counts;i++)
       {
           _tokenIds.increment();
           uint no=_tokenIds.current();
           ids[i]=no;
           amount[i]=1;
          NFT memory _nft=NFT(no,_nftdetail[i],msg.sender,warrantyperd,0,false);
           idtoNFT[ids[i]]=_nft;
       }
     _mintBatch(platform,ids,amount,"");
     for(uint i=0;i<counts;i++)
     {
     accounttonft[platform].push(ids[i]);
     QRtoid[QRlist[i]]=ids[i];
     secrettoid[secretstrings[i]]=ids[i];

     }}  



     function tranferNFTs(address _to,uint []memory ids,uint [] memory amount) external
 {
         _safeBatchTransferFrom(msg.sender,_to,ids,amount,"");
         for(uint i=0;i<ids.length;i++)
         {
            uint  [] storage arr=accounttonft[msg.sender];
            for (uint  j=0;j<arr.length;j++)
            {
                if(ids[i]==arr[j])
               { arr[j]=arr[arr.length-1];
                arr.pop();
                break;}
            } 
            accounttonft[_to].push(ids[i]);
         }
     } 

     modifier notstarted(string memory secretstring)
     {
         require(idtoNFT[secrettoid[secretstring]].starttime==0,"warranty already started");
         _;
     }

function startWarranty(string memory secretstring) public notstarted(secretstring) returns(uint){
    uint id=secrettoid[secretstring];
     uint[] memory ids= new uint[](1);
       uint[] memory amount = new uint[](1);
    ids[0]=id;
    amount[0]=1;
    this.tranferNFTs(msg.sender,ids,amount);
    idtoNFT[id].starttime=block.timestamp;
    return id;
}

function registercompany(string memory _companyhash,address  _caccount) external onlyOwner()
{
_companyIds.increment();
uint no=_companyIds.current();
cidtochash[no]=_companyhash;
caccounttocid[_caccount]=no;
} 
 


function verifyproduct(string memory _qrhash) external view returns(uint)
{
uint nftid=QRtoid[_qrhash];
require(nftid>0,"product not found");
return nftid;
}

function usertonft(address user) external view returns(uint []memory)
{
    return accounttonft[user];
}

}
