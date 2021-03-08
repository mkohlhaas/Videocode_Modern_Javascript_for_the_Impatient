function produceAfterDelay(what, when) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(what), when)
  })                     
}

class TimedRange {
  constructor(from, to) {
    this.from = from
    this.to = to
  }
  async *[Symbol.asyncIterator]() {
    for (let current = this.from; current < this.to; current++) {
      yield await produceAfterDelay(current, 1000)
    }
  }
}


let r = new TimedRange(1, 10)
for await (const e of r) console.log(e)
