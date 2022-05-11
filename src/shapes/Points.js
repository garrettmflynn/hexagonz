
export class Ball {
    
    constructor (playContext){
        this.playContext = playContext
        this.canvas = playContext.canvas
        this.context = playContext.context
        this.radius = (playContext.ballRadius ?? 0.01)
        this.bottomBound = (1 - (this.radius))
        this.position = {x: 0.5, y: this.bottomBound} // 
        this.speed = 0.01 * (playContext.ballSpeed ?? 1)
        this.velocity = {x: 0, y: -0}
        this.active = false
    }

    toggleActive = () => {
        this.active = !this.active
        if (!this.active) {
            this.playContext.inactive.push(this)
        }
    }

    setVelocity = (dx,dy) => {
        this.velocity = {x: dx*this.speed, y: dy*this.speed} // Unit vector input
    }

    move = () => {
        if (this.active) {
            const velX = (this.velocity.x instanceof Function) ? this.velocity.x() : this.velocity.x
            const velY = (this.velocity.y instanceof Function) ? this.velocity.y() : this.velocity.y
            this.position.x += velX
            this.position.y += velY
            const widthRelativeRadius = (this.radius/2) * this.canvas.width / this.canvas.height

            if (this.position.x > (1 - widthRelativeRadius) | this.position.x < (0 + widthRelativeRadius)) this.velocity.x *= -1
            else if (this.position.y < (0 + this.radius)) this.velocity.y *= -1
            else if (this.position.y > this.bottomBound) {
                this.position.y = this.bottomBound
                if (this.playContext.inactive[0]) this.position.x = this.playContext.inactive[0].position.x
                this.toggleActive()
            }
        }
    }

    draw = () => {
        this.context.beginPath();
        this.context.arc(this.position.x * this.canvas.width, this.position.y * this.canvas.height, this.canvas.height*this.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = '#e41049';
        this.context.fill();
    }
}