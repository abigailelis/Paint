class FMonochromatic extends Filters {
    
    constructor(ctx, width, height) {
        super(ctx, width, height);
    }

    doApplyFilter(data) {
        let index = 0, average = 0, value = 0;

        /**
         * 1- Obtiene los valores actuales del pixel.
         * 2- Obtiene el promedio de los tres colores actuales del pixel.
         * 3- Si el promedio es mayor a 127 el valor es 255 sino por defecto es 0
         * 4- Cambia los colores del pixel con los nuevos valores
         */
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                
                index = (x + (y * this.width)) * 4;
                
                let pixel = new Pixel(data);
                let colors = pixel.getColor(index);
            
                average = pixel.getAverage(colors);

                if(average > 127)
                    value = 255;
                else
                    value = 0;
                
                pixel.setColor(value, value, value, index);
            }
        }

        updateMessage("Filtro binarización aplicado con éxito");
    }
}