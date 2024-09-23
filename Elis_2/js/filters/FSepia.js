class FSepia extends Filters {
    
    constructor(ctx, width, height) {
        super(ctx, width, height);
    }

    doApplyFilter(data) {
        let index = 0;

        /* Obtiene los colores de cada pixel y luego se calcula el nuevo valor 
         * multiplicando cada color por un coeficiente fijo para enfatizar los colores calidos
         * y disminuir los tonos fríos creando el efecto sepia.
         * Luego se setea el pixel con los nuevos valores.
         */

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                index = (x + (y * this.width)) * 4;

                let pixel = new Pixel(data);
                let colors = pixel.getColor(index);

                let r = 0.393 * colors.red + 0.769 * colors.green + 0.189 * colors.blue
                let g = 0.349 * colors.red + 0.686 * colors.green + 0.168 * colors.blue;
                let b = 0.272 * colors.red + 0.534 * colors.green + 0.131 * colors.blue;

                pixel.setColor(r, g, b, index);
            }
        }

        updateMessage("Filtro sepia aplicado con éxito");
    }
}

