'use strict'

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const callback = () => {
      try {
        const response = request.response
        const blob = new Blob([response], {type: 'image/png'})
        const img = document.createElement('img')
        img.src = window.URL.createObjectURL(blob)
        resolve(img)
      } catch (e) {
        reject(e)
      }
    }

    const request = new XMLHttpRequest()
    request.open("GET", url)
    request.responseType = 'blob'
    request.addEventListener('load', callback)
    request.send()
  })  
}

document.addEventListener('DOMContentLoaded', () => {
  let p = Promise.resolve()
  for (let i = 1; i <= 4; i++) {
    p = p.then(() => loadImage(`hanafuda/1-${i}.png`))
      .then(img => document.getElementById('images').appendChild(img))
  }
})
