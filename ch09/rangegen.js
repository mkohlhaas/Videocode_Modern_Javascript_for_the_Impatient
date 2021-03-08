function* rangeGenerator(from, to) {
  for (let i = from; i < to; i++) 
    yield i;
}

function* flatArrayGenerator(arr) {
  for (let element of arr)
    if (Array.isArray(element))
      yield* element
    else
      yield element
}

function* reallyFlatArrayGenerator(arr) {
  for (let element of arr)
    if (Array.isArray(element))
      yield* reallyFlatArrayGenerator(element)
    else
      yield element
}
