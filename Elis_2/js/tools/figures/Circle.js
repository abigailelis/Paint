class Circle extends Figure {

    constructor(x, y, ctx, color, width) {
        super(x, y, color, ctx, width);
    }

    /* Calcula el ancho y alto del rectángulo que define el círculo
     * Calcula el centro del círculo.
     * Calcula el radio como la mitad de la diagonal del rectángulo
     */
    draw(x, y, finX, finY) {
        let width = finX - x;
        let height = finY - y;
    
        let centerX = x + width / 2;
        let centerY = y + height / 2;

        let radius = this.calculateRadius(x, y, finX, finY);

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    /* Calcula la distancia entre los puntos inicial y final */

    calculateRadius(startX, startY, endX, endY) {
        return Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    }
}