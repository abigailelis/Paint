class Rectangle extends Figure{

    constructor(x, y, ctx, color, width){
        super(x, y, color, ctx, width);
    }

    draw(x, y, finX, finY){
        let width = finX - x;
        let height = finY - y;
        this.ctx.fillStyle = this.color;
        this.ctx.strokeRect(x, y, width, height);
    }
}