class Player {
  constructor(position) {
    this.position = position

    this.velocity = {
      x: 0,
      y: 0
    }

    this.width = 100
    this.height = 100
    this.sides = {
      bottom: this.position.y + this.height
    }
    this.gravity = 0.7
  }

  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.sides.bottom = this.position.y + this.height

    if (this.sides.bottom + this.velocity.y < canvas.height) {
      this.velocity.y += this.gravity  
    } else this.velocity.y = 0
  }
}