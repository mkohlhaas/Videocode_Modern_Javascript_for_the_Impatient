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
  Promise.all([1, 2, 3, 4].map(i => loadImage(`hanafuda/1-${i}.png`)))
    .then(images => {
      for (const img of images)
        document.getElementById('images').appendChild(img)
    })
  
  Promise.race([1, 2, 3, 4].map(i => loadImage(`hanafuda/1-${i}.png`)))
    .then(img => document.getElementById('images').appendChild(img))
})
