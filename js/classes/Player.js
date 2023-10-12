class Player extends Sprite {
  constructor({position, 
               collisionBlocks, 
               platformBlocks, 
               imageSrc, 
               frameRate, 
               scale = 0.5, 
               animations
              }) {
    super({ imageSrc, frameRate, scale })
    
    this.position = position

    this.velocity = {
      x: 0,
      y: 1
    }

    this.sides = {
      bottom: this.position.y + this.height
    }
    this.gravity = 0.1

    this.collisionBlocks = collisionBlocks
    this.platformBlocks = platformBlocks

    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    }

    this.animations = animations
    this.lastDirection = 'right'

    for (let key in this.animations) {
      const image = new Image()
      image.src = this.animations[key].imageSrc

      this.animations[key].image = image

    }

    this.camerabox= {
      position: {
        x: this.position.x - 50,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    }
  }

  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return

    this.currentFrame = 0
    this.image = this.animations[key].image
    this.frameRate = this.animations[key].frameRate
    this.frameBuffer = this.animations[key].frameBuffer
  }

  updateCamerabox() {
    this.camerabox= {
      position: {
        x: this.position.x - 50,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    }
  }

  checkCanvasSides() {
    if (this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
        this.hitbox.position.x + this.velocity.x <= 0) {
      this.velocity.x = 0
    }
  }

  panLeft({canvas, camera}) {
    const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width

    if (cameraboxRightSide >= 576) return

    if (cameraboxRightSide >= canvas.width / 4 + Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x
    }
  }

  panRight({canvas, camera}) {
    if (this.camerabox.position.x <= 0) return

    if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x
    }
  }

  panDown({ canvas, camera }) {
    if (this.camerabox.position.y + this.velocity.y <= 0) return

    if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
      camera.position.y -= this.velocity.y
    }
  }

  panUp({ canvas, camera }) {
    if (this.camerabox.position.y + this.velocity.y >= 432) return

    if (this.camerabox.position.y + this.camerabox.height >= 
      canvas.height / 4 + Math.abs(camera.position.y)) {
      camera.position.y -= this.velocity.y
    }
  }

  update() {
    this.updateFrames()
    this.updateHitbox()
    this.updateCamerabox()

    // draws out the image
    // c.fillStyle = 'rgba(0, 255, 0, 0.2)'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    // draws out hitbox
    c.fillStyle = 'rgba(255, 0, 0, 0.2)'
    c.fillRect(this.hitbox.position.x, 
               this.hitbox.position.y, 
               this.hitbox.width, 
               this.hitbox.height)

    //draws camera box
    // c.fillStyle = 'rgba(0, 0, 255, 0.2)'
    // c.fillRect(this.camerabox.position.x, 
    //            this.camerabox.position.y, 
    //            this.camerabox.width, 
    //            this.camerabox.height)


    this.draw()

    this.position.x += this.velocity.x
    this.updateHitbox()
    this.checkForHorizontalCollisions()
    this.applyGravity()
    this.updateHitbox()
    this.checkForVerticalCollisions()
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 34,
        y: this.position.y + 27,
      },
      width: 12,
      height: 25,
    }
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      if (collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0

          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y
          this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
          break
        }
      }
    }

    // for platform collisions
    for (let i = 0; i < this.platformBlocks.length; i++) {
      const platformBlock = this.platformBlocks[i]

      if (platformCollision({
          object1: this.hitbox,
          object2: platformBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0

          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
          this.position.y = platformBlock.position.y - offset - 0.01
          break
        }
      }
    }
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      if (collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0

          const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
          this.position.x = collisionBlock.position.x - offset - 0.01
          break
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0

          const offset = this.hitbox.position.x - this.position.x

          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01
          break
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }
}