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

document.addEventListener('DOMContentLoaded', async () => {
  const images = await Promise.all([1, 2, 3, 4].map(i => loadImage(`hanafuda/1-${i}.png`)))
  for (const img of images)
    document.getElementById('images').appendChild(img)
})
