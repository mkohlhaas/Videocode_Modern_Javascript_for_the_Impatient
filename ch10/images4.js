'use strict'

function addImage(url) {
  return new Promise((resolve, reject) => {
    const callback = () => {
      try {
        const response = request.response
        const blob = new Blob([response], {type: 'image/png'})
        const img = document.createElement('img')
        img.src = window.URL.createObjectURL(blob)
        document.getElementById('images').appendChild(img)
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
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  fetch('https://aws.random.cat/meow')
    .then(result => result.json())
    .then(json => loadImage(`${proxy}/${json.file}`))
    .then(img => document.getElementById('images').appendChild(img))
})
