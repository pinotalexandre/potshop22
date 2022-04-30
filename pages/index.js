// for next.js's <head> tag and rendering images
import Head from 'next/head'
import Image from 'next/image'

// import the web3 library with setup from lib/web3.js
import { web3 } from '../lib/web3';

// import react hooks
import { useState, useEffect } from 'react';

// all from our components folder
import Account from '../components/Account'
import EthName from '../components/EthName'
import Answer from '../components/Answer'
import AnswerForm from '../components/AnswerForm'

export default function Home() {
  // todo:
  // 1. make the connect button work!
  // 2. get the answers from the API (see /api/answers.js file)
  // 3. add tipping like project 1
  // 4. make the user name look good
  // 5. let the user post their own reply

  const [accounts, setAccounts] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const[isLoading, setIsLoading] = useState(true)
  const [answers, setAnswers] = useState([])

  const connect = async function () {
    let a = await window.ethereum.request({ method: "eth_requestAccounts" })
    setAccounts(a)

    if(a.length > 0) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }

useEffect(function() {
  if (accounts.length > 0) {
    setIsLoggedIn(true)
  } else {
    setIsLoggedIn(false)
  }
}, [accounts])


// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(async function () {
  let a = await window.ethereum.request({ method: "eth_accounts" })
  setAccounts(a)

  window.ethereum.on("accountsChanged", function (a) {
    setAccounts(a)
  })

  fetch("/api/answers")
  .then(response => response.json())
  .then(data => { setAnswers(data.answers)
   setIsLoading(false)
  })
}, [])


let answersArea = 
(
<div className="loading">Loading answers...</div>
)

if (!isLoading) {
  answersArea = answers.map(function (answer, index) {
    // eslint-disable-next-line react/jsx-key
    return <Answer number={index +1} answer={answer} accounts={accounts} isLoggedIn={isLoggedIn} />
  })
}

  return (
    <main>
      <header>
        <h1>PotShop</h1>


        <Account accounts={accounts} isLoggedIn={isLoggedIn} connect={connect} />
      </header>

      <section className="question">
        <div className="main">
          <h3>r/poterie #1</h3>
          <h2>Besoin de conseil pour un débutant</h2>
          <p>Bonjour à tous ! Je suis nouveau dans le monde de la poterie et jaimerai connaître quelque petite technique. Et si vous aviez des retours à faire sur ma première création</p>

          <div className="slides">
            <Image src="/image-1.jpg" width="600" height="800" alt="picture"/>
            <Image src="/image-2.jpg" width="600" height="800" alt="picture" />
            <Image src="/image-3.jpg" width="600" height="800" alt="picture" />
            <Image src="/image-4.jpg" width="600" height="800" alt="picture" />
          </div>
        </div>
        <div className="meta">
          {/* EthName */}
          <div className="eth-name">
            <div className="name">
              <span className="primary">pinot.eth</span>
              <span className="secondary">0xAE6DcE18...f8B8</span>
            </div>
          </div>
          {/* end EthName */}

        </div>
      </section>
      <section className="answers">
      {answersArea}

      <AnswerForm accounts={accounts} setAnswers={setAnswers} isLoggedIn={isLoggedIn} />
      </section>

      <Head>
        <title> PotShop </title>
        <meta property="og:title" content="Looking for feedback as a beginner on Potstop" />
        <meta property="og:description" content="This is a project on the SuperHi Crypto + Web3 for Creatives course" />
        <meta property="og:image" content="/social.png" />
      </Head>
    </main>
  )
}
