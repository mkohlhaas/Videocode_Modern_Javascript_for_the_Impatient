'use strict'

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open("GET", url)
    request.responseType = 'blob'

    request.addEventListener('load', () => {
      try {
        if (request.statusText !== 'OK') reject(Error(request.status))
        const response = request.response
        const blob = new Blob([response], {type: 'image/png'})
        const img = document.createElement('img')
        img.src = window.URL.createObjectURL(blob)
        // document.getElementById('images').appendChild(img)
        resolve(img)
      } catch (e) {
        reject(e)
      }
    })
    request.send()
  })  
}

document.addEventListener('DOMContentLoaded', () => {
  const promise = loadImage('hanafuda/1-q.png')
    promise
    .then(img => document.getElementById('images').appendChild(img))
    .then(() => loadImage('hanafuda/1-2.png'))
    .then(img => document.getElementById('images').appendChild(img))
      .catch(reason => console.log(`promise catch ${reason}`))
  // loadImage('hanafuda/1-3.png')
    // loadImage('hanafuda/1-4.png')
})
