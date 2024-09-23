class FNegative extends Filters {
    
    constructor(ctx, width, height) {
        super(ctx, width, height);
    }

    doApplyFilter(data) {

        let index = 0;

        /* Obtiene los valores de cada pixel y los setea a cada uno con su complementario
         * calculando 255 - color.
         */
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                index = (x + (y * this.width)) * 4;

                let pixel = new Pixel(data);
                let colors = pixel.getColor(index);

                pixel.setColor(255 - colors.red, 255 - colors.green, 255 - colors.blue, index)
            }
        }
        updateMessage("Filtro negativo aplicado con éxito");
    }
}

