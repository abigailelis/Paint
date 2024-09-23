class Imagen {

    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    /**
     * Función que setea el src de la imágen y calcula el ancho y alto de la
     * misma para que el ancho de ésta no supere el del canvas.
     */
    loadImage(fileName) {
        let canvasHeight = this.height;
        let canvasWidth = this.width;
        let ctx = this.ctx;

        let myImg = new Image();
        myImg.src = URL.createObjectURL(fileName);

        myImg.onload = function () {
            const aspectRatio = this.naturalWidth / this.naturalHeight;
            let targetHeight = canvasWidth / aspectRatio;
            let targetWidth = canvasHeight / aspectRatio;

            if (targetHeight > canvasHeight){
                targetHeight = targetWidth * aspectRatio;
                targetWidth = targetHeight * aspectRatio;
                ctx.drawImage(this, 0, 0, targetWidth, targetHeight);
            }
            else
                ctx.drawImage(this, 0, 0, canvasWidth, targetHeight);

            updateMessage('Imagen cargada con éxito');
        }
    }
}