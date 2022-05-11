
export class Box {
    
    constructor (playContext, x, y){
        this.playContext = playContext
        this.canvas = playContext.canvas
        this.context = playContext.context
        this.length = (playContext.boxLength ?? 0.10)
        this.position = {x: x ?? 0, y: y ?? 0}
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

            const widthRelativeRadius = (ball.radius) * ball.canvas.width / ball.canvas.height
            const widthRelativeLength= (this.length/4) * this.canvas.width / this.canvas.height

            // Check Collision
            var dx=(ball.position.x)-(this.position.x+widthRelativeLength);
            var dy=(ball.position.y)-(this.position.y+this.length/2);
            var width=(widthRelativeRadius+widthRelativeLength)/2;
            var height=((ball.radius)+this.length)/2;
            var crossWidth=width*dy;
            var crossHeight=height*dx;

            if(Math.abs(dx)<=width && Math.abs(dy)<=height){
                    hit = true
                    this.lives -= 1
                    if(crossWidth>crossHeight){
                        if (crossWidth>(-crossHeight)) ball.velocity.y *= -1
                        else ball.velocity.x *= -1
                    } else{
                        if (crossWidth>-(crossHeight)) ball.velocity.x *= -1
                        else ball.velocity.y *= -1
                    }
                }
        })

        this.color = (hit) ? '#10e485' : '#e41049'
        return (this.lives <= 0)
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