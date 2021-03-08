function* sumGenerator() {
  let sum = 0
  try {
    while (true) {
      let nextValue = yield sum
      sum += nextValue
    }
  } catch {
    console.log(`Final sum: ${sum}`)
  }
}
