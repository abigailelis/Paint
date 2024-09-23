class Eraser extends Pencil {

    constructor(x, y, ctx, width){
        super(x, y, ctx, "white", width);
    }

    setColor(color){
        color = "white";
        this.ctx.strokeStyle = color;
    }
}