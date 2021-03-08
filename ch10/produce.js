function produceAfterDelay(what, when) {
  return new Promise((resolve, reject) => {
    const callback = () => resolve(what)
    setTimeout(callback, when)
  })                     
}

async function logWhenReady(p) {
  console.log(await p)
}

async function* produceAll(whats, when) {
  for (const w of whats) yield await produceAfterDelay(w, when)
}


async function produce1() {
  const [x1, x2] = await Promise.all([produceAfterDelay(1, 1000), produceAfterDelay(2, 1000)])
  console.log(x1, x2)
}

async function produce2() {
  const xPromises = [1, 2].map(async x => await produceAfterDelay(x, 1000))
  for (const xPromise of xPromises) console.log(await xPromise)
}

async function produce3() {
  const xPromises = [1, 2].map(async x => await produceAfterDelay(x, 1000))
  for await (const x of xPromises) console.log(x)
}


