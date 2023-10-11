const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}

const collisionBlocks = []
floorCollisions2D.forEach((row, y)=> {
  row.forEach((symbol, x) => {
    if(symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock ({
          position: {
            x: 16 * x,
            y: 16 * y,
          },
        })
      )
    }
  })
})

const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}

const platformBlocks = []
platformCollisions2D.forEach((row, y)=> {
  row.forEach((symbol, x) => {
    if(symbol === 202) {
      platformBlocks.push(
        new CollisionBlock ({
          position: {
            x: 16 * x,
            y: 16 * y,
          },
        })
      )
    }
  })
})

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const player = new Player({
  position: {
    x: 100,
    y: 300,
  },
  collisionBlocks,
  imageSrc: './images/warrior/Idle.png',
  frameRate: 8,
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
  imageSrc: './images/background.png'
})

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.save()
  c.scale(4,4)
  c.translate(0, -background.image.height + scaledCanvas.height)
  background.update()
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update()
  })
  platformBlocks.forEach((platformBlock) => {
    platformBlock.update()
  })

  player.update()

  player.velocity.x = 0
  if (keys.d.pressed) {
    player.velocity.x = 5
  } else if (keys.a.pressed) {
    player.velocity.x = -5
  }

  c.restore()
}

animate()
