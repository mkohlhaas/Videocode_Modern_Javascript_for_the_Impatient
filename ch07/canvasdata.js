'use strict'

document.addEventListener('DOMContentLoaded', function () {
  const img = new Image()
  img.src = 'hanafuda/5-4.png'
  img.addEventListener('load', () => {
    const colorswatch = document.getElementById('colorswatch')
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    let data = ctx.getImageData(0, 0, canvas.width, canvas.height).data

    canvas.addEventListener('mousemove', event => {
      const rect = canvas.getBoundingClientRect()
      const x = Math.round(event.clientX - rect.left)
      const y = Math.round(event.clientY - rect.top)
      const offset = 4 * (canvas.width * y + x)
      let rgba = `rgba(${data[offset]},${data[offset + 1]},${data[offset + 2]},${(data[offset + 3] / 255)})`
      colorswatch.style.background = rgba
    })      
  })  
})
