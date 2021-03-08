'use strict'

function createAccount() {
  let balance = 0
  return {
    deposit: amount => { balance += amount },
    withdraw: amount => {
      if (amount <= balance)
        balance -= amount
    },
    getBalance: () => balance
  }
}

function createCheckingAccount() {
  const base = createAccount()
  const FEE = 5
  return Object.assign(Object.create(base), {
    withdraw: amount => {
      base.withdraw(amount + FEE)
    }
  })
}

const harrysAccount = createAccount()
const sallysAccount = createCheckingAccount()
harrysAccount.deposit(500)
harrysAccount.withdraw(100)
sallysAccount.deposit(500)
sallysAccount.withdraw(100)  
console.log(`Harry's account balance: ${harrysAccount.getBalance()}`)
console.log(`Sally's account balance: ${sallysAccount.getBalance()}`)

