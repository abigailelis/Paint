class FGray extends Filters {
    
    constructor(ctx, width, height) {
        super(ctx, width, height);
    }

    doApplyFilter(data) {
        let average = 0, index = 0;

        /* Obtiene los colores de cada pixel, calcula el promedio y luego
         * setea todos los valores de dicho pixel con el promedio obtenido.
         */
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                index = (x + (y * this.width)) * 4;

                let pixel = new Pixel(data);
                let colors = pixel.getColor(index);

                average = pixel.getAverage(colors);

                pixel.setColor(average, average, average, index);
            }
        }

        updateMessage("Filtro escala de grises aplicado con éxito");
    }
}