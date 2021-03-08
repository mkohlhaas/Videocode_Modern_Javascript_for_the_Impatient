'use strict'

function loadImage(url) {
  const request = new XMLHttpRequest()
  request.open("GET", url)
  request.responseType = 'blob'

  request.addEventListener('load', () => {
    const response = request.response
    const blob = new Blob([response], {type: 'image/png'})
    const img = document.createElement('img')
    img.src = window.URL.createObjectURL(blob)
    document.getElementById('images').appendChild(img)   
  })
  request.send()
}

document.addEventListener('DOMContentLoaded', () => {
  loadImage('hanafuda/1-1.png')
  loadImage('hanafuda/1-2.png')
  loadImage('hanafuda/1-3.png')
  loadImage('hanafuda/1-4.png')
})
