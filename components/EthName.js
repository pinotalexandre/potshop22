import { useState, useEffect } from "react"
import { web3 } from '../lib/web3';
import Jazzicon, {jsNumberForAddress} from 'react-jazzicon'
import ENS, { getEnsAddress } from '@ensdomains/ensjs'
const ens = new ENS({
  provider: web3.currentProvider,
  ensAddress: getEnsAddress("1")
})
const EnsName = function ({ address }) {
  // TODO!
  // check for ENS domain
  // get image if it has one
  const [name, setName] = useState()
  const [avatar, setAvatar] = useState()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async function () {
    const n = await ens.getName(address)
    if (n.name) {
      setName(n.name)
    }
  }, [address])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async function () {
    if (name) {
const a = await ens.name(name).getText("avatar")

if(a) {
  setAvatar(a)
}
    }
  }, [name])
  let formattedAddress = address.substr(0, 8) + "..." + address.substr(-4)
  let icon = (
    <Jazzicon diameter={"32"} seed={jsNumberForAddress(address)}/>
  )
  return (
    <div className="eth-name">
      <div className="icon">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar}></img>
        ) : icon}
      </div>

      <div className="name">
        <span className="primary">
          {name ? name : formattedAddress}
          {/* ENS name if one here */}
        </span>
        <span className="secondary">
          {name ? formattedAddress : ""}
        </span>
      </div>
     
    </div>
  )
}

export default EnsName