class Fraction {
  constructor(num, denom) {
    this.num = num
    this.denom = denom
  }

  toString() {
    return `${this.num}/${this.denom}`    
  }

  valueOf() {
    return this.num / this.denom
  }
}

// This is no better--still converts with +

class Fraction2 {
  constructor(num, denom) {
    this.num = num
    this.denom = denom
  }
  [Symbol.toPrimitive](hint) {
    if (hint === 'string') return `${this.num}/${this.denom}`
    else return this.num / this.denom
  }
}
