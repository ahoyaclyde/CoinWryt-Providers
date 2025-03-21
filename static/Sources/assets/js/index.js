window.userWalletAddress = null
const connectWallet = document.getElementById('connectWallet')
const walletAddress = document.getElementById('walletAddress')
const walletBalance = document.getElementById('walletBalance')



function checkInstalled() {
  if (typeof window.ethereum == 'undefined') {
    connectWallet.innerText = 'MetaMask isnt installed, please install it'
    connectWallet.classList.remove()
    connectWallet.classList.add()
    return false
  }
  connectWallet.addEventListener('click', connectWalletwithMetaMask)
}

async function connectWalletwithMetaMask() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  .catch((e) => {
  console.error(e.message)
  return
  })

  if (!accounts) { return }

  window.userWalletAddress = accounts[0]
  walletAddress.value = window.userWalletAddress

  connectWallet.innerText = 'Sign Out'
  connectWallet.removeEventListener('click', connectWalletwithMetaMask)
  setTimeout(() => {
    connectWallet.addEventListener('click', signOutOfMetaMask)
  }, 200)

}


function signOutOfMetaMask() {
  window.userwalletAddress = null
  walletAddress.value = ''
  connectWallet.innerText = 'Connect Wallet'

  connectWallet.removeEventListener('click', signOutOfMetaMask)
  setTimeout(() => {
    connectWallet.addEventListener('click', connectWalletwithMetaMask)
  }, 200  )
}

async function checkBalance() {
  let balance = await window.ethereum.request({ method: "eth_getBalance",
  params: [
    window.userWalletAddress,
    'latest'
  ]
}).catch((err)=> {
    console.log(err)
})

console.log(parseFloat((balance) / Math.pow(10,18)))

walletBalance.innerText = parseFloat((balance) / Math.pow(10,18))
}

window.addEventListener('DOMContentLoaded', () => {
  checkInstalled()
})
