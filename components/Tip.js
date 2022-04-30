import { web3 } from '../lib/web3'
import { useState, useEffect } from 'react'
import { emptyAddress } from '@ensdomains/ensjs/dist/utils'

const Tip = function ({isLoggedIn, accounts, address}) {
  const send = function () {
    if (isLoggedIn) {
const price = web3.utils.toWei("0.01", "ether")

window.ethereum.request( {
   method: "eth_sendTransaction",
   params: [{
     from: accounts[0],
     to: address, 
     value: web3.utils.toHex(price)
   }]
  })
    } else
 {
   alert ("S'il vous plaît connecter un portefeuille")
 }  }


 if (accounts[0] == address) {
   return (
     <button disabled={true}>This is you</button>
   )
 } else {
  return (
    <button disabled={!isLoggedIn} onClick={send}>Envoyer 0.01 ETH</button>
  )
 }

}

export default Tip