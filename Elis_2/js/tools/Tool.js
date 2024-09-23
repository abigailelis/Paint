class Tool {

    constructor(x, y, ctx, color, width){
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.lineCap = 'round';
    }

    draw(x, y){
        //Do anything
    }

    moveTo(x, y){
        this.x = x;
        this.y = y;
    }

    setWidth(width){
        this.ctx.lineWidth = width;
    }

    setColor(color){
        this.ctx.strokeStyle = color;
    }
}