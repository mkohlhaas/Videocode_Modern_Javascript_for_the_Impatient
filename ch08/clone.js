let obj = { name: 'Fred', age: 42 }
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))


class Employee {
  constructor(name, salary) {
    this.name = name
    this._salary = salary
  }
  get salary() { return this._salary }
  set salary(newValue) { this._salary = newValue }
  raiseSalary(percent) { this._salary *= 1 + percent / 100 }
}

class Manager extends Employee {
  constructor(name, salary, bonus) {
    super(name, salary)
    this.bonus = bonus
  }
  get salary() { return super.salary + this.bonus }
}

const boss = new Manager('Barbara Boss', 180000, 20000)

function clone(obj, cloneRegistry = new Map()) {
  if (typeof obj !== 'object' || Object.isFrozen(obj)) return obj
  if (cloneRegistry.has(obj)) return cloneRegistry.get(obj)
  const props = Object.getOwnPropertyDescriptors(obj)
  let result = Array.isArray(obj) ? Array.from(obj)
      : Object.create(Object.getPrototypeOf(obj), props)
  cloneRegistry.set(obj, result)
  for (const prop in props) {
    result[prop] = clone(obj[prop], cloneRegistry)
  }
  return result
}






let a = [1,2,3]
let b = [4,5,6]
a.push(b)
b.push(a)
let c = clone(a)
