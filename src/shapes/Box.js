
export class Box {
    
    constructor (playContext){
        this.playContext = playContext
        this.canvas = playContext.canvas
        this.context = playContext.context
        this.length = (playContext.boxLength ?? 0.10)
        this.position = {x: 0.5 - this.length/4, y: 0.5 - this.length/4}
        this.lives = 5
        this.color = '#e41049'
    }

    toggleActive = () => {
        this.active = !this.active
        if (!this.active) {
            this.playContext.inactive.push(this)
        }
    }


    check = () => {
        let hit = false
        this.playContext.balls.forEach(ball => {

            const widthRelativeRadius = (ball.radius/2) * ball.canvas.width / ball.canvas.height
            if (ball.position.x + widthRelativeRadius > this.position.x && ball.position.x - widthRelativeRadius < this.position.x + this.length) {
                if (ball.position.y + ball.radius > this.position.y && ball.position.y - ball.radius < this.position.y + this.length) {
                    hit = true
                    this.lives -= 1

                    if (ball.velocity.x == ball.velocity.y) console.log('SAME!')
                    const absX = Math.abs(ball.velocity.x)
                    const absY = Math.abs(ball.velocity.y)
                    const maxVel = Math.max(absX, absY)
                    if (maxVel === absX) ball.velocity.x *= -1
                    else ball.velocity.y *= -1
                }
            }
            // else if (ball.position.y < (0 + this.radius)) this.velocity.y *= -1
            // else if (ball.position.y > this.bottomBound) {
            //     this.position.y = this.bottomBound
            //     if (this.playContext.inactive[0]) this.position.x = this.playContext.inactive[0].position.x
            //     this.toggleActive()
            // }
        })

        this.color = (hit) ? '#10e485' : '#e41049'
    }

    draw = () => {
        this.context.beginPath();
        this.context.beginPath();
        const w = this.canvas.height*this.length
        const h = w;
        const pxX = this.position.x * this.canvas.width
        const pxY = this.position.y * this.canvas.height

        this.context.rect(pxX, pxY, w,h);
        this.context.fillStyle = this.color;
        this.context.fill();

        this.context.fillStyle = 'white';
        this.context.font = "18px Arial";
        this.context.textBaseline = 'middle';
        this.context.textAlign = 'center';
        this.context.fillText(this.lives, pxX + w/2, pxY + h/2);
    }
}