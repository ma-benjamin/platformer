const canvas = document.querySelector('canvas')
const c = canvas.getContext ('2d')

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const player1 = new Player({
  x: 0,
  y: 0,
})

const player2 = new Player({
  x: 200,
  y: 100
})

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  d: {
    pressed: false
  }

}

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)
  
  player1.velocity.x = 0
  if (keys.d.pressed) {
    player1.velocity.x = 3
  } else if (keys.a.pressed) {
    player1.velocity.x = -3
  }

  player1.update()
  player2.update()
}

animate()
