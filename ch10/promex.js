function doStuffLater() {
  console.log('entering doStuffLater')
  return new Promise((resolve, reject) => {
    console.log('entering promise constructor')
    throw Error('foo')
    setTimeout(() => {
      // try {
        console.log('entering timeout task')
        throw Error('bar')
        resolve(42)
      // } catch (e) {
        // reject(e)
      // }
    }, 1000)
  })
}

promise = doStuffLater()
console.log('constructed promise')
promise.catch(e => console.log(`caught ${e}`)).then(x => console.log(x))

// promise.finally(() => console.log("pheew--settled"))
                    
 
