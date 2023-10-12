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
          height: 4
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
  platformBlocks,
  imageSrc: './images/warrior/Idle.png',
  frameRate: 8,
  animations: {
    Idle: {
      imageSrc: './images/warrior/Idle.png',
      frameRate: 8,
      frameBuffer: 8,
    },
    IdleLeft: {
      imageSrc: './images/warrior/IdleLeft.png',
      frameRate: 8,
      frameBuffer: 5,
    },
    Run: {
      imageSrc: './images/warrior/Run.png',
      frameRate: 8,
      frameBuffer: 5,
    },
    RunLeft: {
      imageSrc: './images/warrior/RunLeft.png',
      frameRate: 8,
      frameBuffer: 5,
    },
    Jump: {
      imageSrc: './images/warrior/Jump.png',
      frameRate: 2,
      frameBuffer: 3,
    },
    JumpLeft: {
      imageSrc: './images/warrior/JumpLeft.png',
      frameRate: 2,
      frameBuffer: 3,
    },
    Fall: {
      imageSrc: './images/warrior/Fall.png',
      frameRate: 2,
      frameBuffer: 3,
    },
    FallLeft: {
      imageSrc: './images/warrior/FallLeft.png',
      frameRate: 2,
      frameBuffer: 3,
    },
    
  }
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

const bgImgHeight = 432

const camera = {
  position: {
    x: 0,
    y: -bgImgHeight + scaledCanvas.height,
  }
}

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.save()
  c.scale(4,4)
  c.translate(camera.position.x, camera.position.y)
  background.update()
  
  // collisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.update()
  // })
  // platformBlocks.forEach((platformBlock) => {
  //   platformBlock.update()
  // })

  player.checkCanvasSides()
  player.update()

  player.velocity.x = 0
  if (keys.d.pressed) {
    player.switchSprite('Run')
    player.velocity.x = 2
    player.lastDirection = 'right'
    player.panLeft({canvas, camera})
  } else if (keys.a.pressed) {
    player.lastDirection = 'left'
    player.switchSprite('RunLeft')
    player.velocity.x = -2
    player.panRight({canvas, camera})
  } else if (player.velocity.y === 0) {
    if (player.lastDirection ==='right') {
      player.switchSprite('Idle')
    } else {
      player.switchSprite('IdleLeft')
    }
  }

  if (player.velocity.y < 0) {
    player.panDown({ canvas, camera })
    if (player.lastDirection ==='right') {
      player.switchSprite('Jump')
    } else {
      player.switchSprite('JumpLeft')
    }
  } else if (player.velocity.y > 0) {
    player.panUp({ canvas, camera })
    if (player.lastDirection ==='right') {
      player.switchSprite('Fall')
    } else {
      player.switchSprite('FallLeft')
    }
  }

  c.restore()
}

animate()
