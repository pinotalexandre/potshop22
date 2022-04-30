// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { web3 } from '../../lib/web3'
import MarkdownIt from 'markdown-it';

// make a new markdown renderer
const markdown = new MarkdownIt()

// a list of 3 answers by default
// usually this would come from a database
// but to keep things simple, we're setting it here
const answers = [
  `C'est du super travail pour un débutant ! `,
  `Peut-être un peu plus d'eau ?
  
  Avec un peu plus d'eau ça pourra rendre la pâte plus modulable`,
  `Je ne suis pas d'accord avec la réponse n°2, le niveau d'eau à l'air très correct là`
].map(a => markdown.render(a))


// what happens when we ask for /api/answers
export default function handler(req, res) {
  // if sent via a form, e.g. the reply form
  if (req.method === "POST") {
    
    const { signedMessage, confirmationMessage, account, reply="", questionId=1 } = req.body

    if (signedMessage !== null && confirmationMessage !== null && account !== null) {
      // get account from the confirmation message
      // and signed message
      const recoveredAccount = web3.eth.accounts.recover(confirmationMessage, signedMessage)

      // check if account is same
      if (account.toLowerCase() === recoveredAccount.toLowerCase()) {  
        // yep, so render reply
        // you would usually save to a database here
        let newReply = markdown.render(reply)
        
        // return all good
        res
          .status(200)
          .json({ account, reply: newReply, questionId, answerId: 3 })
      } else {  
        // incorrect account
        res
          .status(401)
          .json({ error: "incorrect account" })
      }
    } else {
      // need to sign that message!
      res
        .status(401)
        .json({ error: "need to sign message" })
    }
  } else {
    // if fetched normally using fetch()
    const data = [
      { questionId: 1, answerId: 1, reply: answers[0], account: "0xAE6DcE18c4d00c08f4b21d48064F68425493f8B8" },
      { questionId: 1, answerId: 2, reply: answers[1], account: "0xAE6DcE18c4d00c08f4b21d48064F68425493f8B8" },
      { questionId: 1, answerId: 3, reply: answers[2], account: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65" }
    ]
  
    res
      .setHeader('Content-Type', 'application/json')
      .status(200)
      .json({ answers: data })
  }
}
