class Range {
  constructor(from, to) {
    this.from = from
    this.to = to
  }
  [Symbol.iterator]() {
    let current = this.from
    return {
      next: () => {
        if (current < this.to) {
          const result = { value: current, done: false }
          current++
          return result
        }
        else
          return { value: undefined, done: true }
      }
    }
  }
}


let r = new Range(1, 100)
let [first, second, third] = r
