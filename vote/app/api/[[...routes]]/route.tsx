/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { parseEther } from 'frog'

const abi = [ 
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "support",
        "type": "uint8"
      }
    ],
    "name": "castVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },

  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "support",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "reason",
        "type": "string"
      }
    ],
    "name": "castVoteWithReason",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})
 
app.frame('/', (c) => {
  return c.res({
    action: '/finish',
    image: (
      <div style={{ color: 'gray', display: 'flex', fontSize: 60 }}>
        Cast Vote for my proposal
      </div>
    ),
    intents: [
      <TextInput placeholder="0=against, 1=for, 2=abstain"/>,
      // <TextInput placeholder="Reason for your vote" />,
      <Button.Transaction target="/vote">Vote</Button.Transaction>,
      // <Button.Transaction target="/castVoteWithReason">CastVoteWithReason</Button.Transaction>,
    ]
  })
})
 
app.frame('/finish', (c) => {
  const { transactionId } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Transaction ID: {transactionId}
      </div>
    )
  })
})
 
app.transaction('/vote', (c) => {
  const { inputText } = c
  // Send transaction response.
  return c.contract({
    abi,
    chainId: 'eip155:1',
    functionName: 'castVote',
    //@ts-ignore
    args: [192, inputText],
    to: '0x5d2C31ce16924C2a71D317e5BbFd5ce387854039',
  })
})
 
app.transaction('/mint', (c) => {
  const { inputText } = c
  // Contract transaction response.
  return c.contract({
    abi,
    chainId: 'eip155:10',
    functionName: 'mint',
    //@ts-ignore
    args: [69420n],
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    //@ts-ignore
    value: parseEther(inputText)
  })
})

app.transaction('/castVoteWithReason', (c) => {
  const { inputText } = c;
  //@ts-ignore
  const reason = c.req.query.reason;
  // Send transaction response.
  return c.contract({
    abi,
    chainId: 'eip155:1',
    functionName: 'castVoteWithReason',
    //@ts-ignore
    args: [192, inputText, reason],
    to: '0x5d2C31ce16924C2a71D317e5BbFd5ce387854039',
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)


// /** @jsxImportSource frog/jsx */

// import { Button, Frog, TextInput } from 'frog'
// import { devtools } from 'frog/dev'
// // import { neynar } from 'frog/hubs'
// import { handle } from 'frog/next'
// import { serveStatic } from 'frog/serve-static'

// const app = new Frog({
//   assetsPath: '/',
//   basePath: '/api',
//   // Supply a Hub to enable frame verification.
//   // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
// })

// // Uncomment to use Edge Runtime
// // export const runtime = 'edge'

// app.frame('/', (c) => {
//   const { buttonValue, inputText, status } = c
//   const fruit = inputText || buttonValue
//   return c.res({
//     image: (
//       <div
//         style={{
//           alignItems: 'center',
//           background:
//             status === 'response'
//               ? 'linear-gradient(to right, #432889, #17101F)'
//               : 'black',
//           backgroundSize: '100% 100%',
//           display: 'flex',
//           flexDirection: 'column',
//           flexWrap: 'nowrap',
//           height: '100%',
//           justifyContent: 'center',
//           textAlign: 'center',
//           width: '100%',
//         }}
//       >
//         <div
//           style={{
//             color: 'white',
//             fontSize: 60,
//             fontStyle: 'normal',
//             letterSpacing: '-0.025em',
//             lineHeight: 1.4,
//             marginTop: 30,
//             padding: '0 120px',
//             whiteSpace: 'pre-wrap',
//           }}
//         >
//           {status === 'response'
//             ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
//             : 'Welcome!'}
//         </div>
//       </div>
//     ),
//     intents: [
//       <TextInput placeholder="Enter custom fruit..." />,
//       <Button value="apples">Apples</Button>,
//       <Button value="oranges">Oranges</Button>,
//       <Button value="bananas">Bananas</Button>,
//       status === 'response' && <Button.Reset>Reset</Button.Reset>,
//     ],
//   })
// })

// devtools(app, { serveStatic })

// export const GET = handle(app)
// export const POST = handle(app)
