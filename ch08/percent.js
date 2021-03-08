class Percent {
  constructor(rate) {
    this.rate = rate
  }

  toString() {
    return `${this.rate}%`    
  }

  valueOf() {
    return this.rate * 0.01
  }

  [Symbol.toPrimitive](hint) {
    console.log(hint)
    if (hint === 'number')
      return this.rate * 0.01
    else 
      return `${this.rate}%`
  }  
}
