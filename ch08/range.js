const knownObjects = new WeakMap()

function stringify(x) {
  if (knownObjects.has(x)) return knownObjects.get(x)
  else if (x === null) return 'null'
  else return x.toString()
}
      
function logEverything(name, obj) {
  knownObjects.set(obj, name)
  const getHandler = {
    get(target, trapKey, receiver) {
      return (...args) => {
        console.log(`Trapping ${trapKey}(${args.map(stringify)})`)
        return Reflect[trapKey](...args);
      }
    }
  }
  
  const result = new Proxy(obj, new Proxy({}, getHandler))
  knownObjects.set(result, `proxy of ${name}`)
  return result
}

function createRange(from, to) {
  function isIndex(x) {
    if (typeof x !== 'string') return false
    const index = Number(x)
    return 0 <= index && index < to - from
  }

  const target = logEverything('rangeTarget', {})
  Object.defineProperty(target, 'length', {
    value: to - from,
    enumerable: false,
    writable: false,
    configurable: false
  })
  Object.defineProperty(target, 'toString', {
    toString: () => `[${from}, ${to})`,
    enumerable: false,
    writable: false,
    configurable: false
  })
  
  return new Proxy(target, {
    get: (target, key, receiver) => {
      if (isIndex(key)) 
        return from + Number(key)
      else 
        return Reflect.get(target, key, receiver)
    },
    set: (target, key, value, receiver) => {
      if (isIndex(key))
        throw Error(`Cannot set key ${key}`)
      else
        return Reflect.set(target, key, value, receiver)
    },
    deleteProperty: (target, key) => {
      if (isIndex(key))
        return false
      else
        return Reflect.deleteProperty(target, key)
    },
    has: (target, key) => {
      if (isIndex(key))
        return true
      else
        return Reflect.has(target, key)      
    },
    getOwnPropertyDescriptor: (target, key) => {
      if (isIndex(key))
        return {
          value: from + Number(key),
          writable: false,
          enumerable: true,
          configurable: true, // https://stackoverflow.com/questions/40921884/create-dynamic-non-configurable-properties-using-proxy
        }
      else
        return Reflect.getOwnPropertyDescriptor(target, key)      
    },
    defineProperty: (target, key, descriptor) => {
      if (isIndex(key)) return false
      else return Reflect.defineProperty(target, key, descriptor)
    },
    ownKeys: target => {
      const result = Reflect.ownKeys(target)
      for (let i = 0; i < to - from; i++)
        result.push(String(i))
      return result
    },
  })
}

const r = logEverything('r', createRange(10, 100)) 
Object.getOwnPropertyDescriptor(r, 'length')
