class Pencil extends Tool{

    constructor(x, y, ctx, color, width){
        super(x, y, ctx, color, width);
    }

    setColor(color){
        this.ctx.strokeStyle = color;
    }

    draw(x, y){
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

}