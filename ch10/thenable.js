function wait(time, value) {
  return {
    then: action => {
      setTimeout(() => {
        action(value)
      }, time)
    } 
  }
}

const myThenable = wait(1000, 42)

Promise.resolve(myThenable).then(x => console.log('done', x))

async function example(){
  console.log('example') // Logs immediately 
  const result = await wait(1000, 42)
  console.log('result', result) // Logs after one second
}
 
example()
