const canvas = document.querySelector('canvas')
const c = canvas.getContext ('2d')

canvas.width = 1024
canvas.height = 576

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4
}

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
  constructor({position, imageSrc}) {
    this.position = position
    this.image = new Image()
    this.image.src = imageSrc
  }

  draw() {
    if (!this.image) return
    c.drawImage(this.image, this.position.x, this.position.y)
  }

  update() {
    this.draw()
  }
}

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

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './images/background.jpg'
})

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
  c.save()
  c.scale(3,3)
  c.translate(0, -background.image.height + scaledCanvas.height*4/3)
  background.update()
  c.restore()

  player1.update()
  player2.update()
}

animate()
