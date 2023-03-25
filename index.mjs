import { BingChat } from 'bing-chat'
import fs from 'fs'

var msg = ""
for(var i = 2; i<process.argv.length; i++){
   msg += ' ' + process.argv[i]
}

const api = new BingChat({
  cookie: process.env.BING_COOKIE
})


async function example() {
  const res = await api.sendMessage(msg, {
    variant: 'Creative',
    // print the partial response as the AI is "typing"
    onProgress: (partialResponse) => {
      console.clear()
      console.log(partialResponse.text)
      // fs.writeFileSync('answer.md', partialResponse.text)
    }
  })
  
  // print the full text at the end
  // console.log(res.text)
}

example()