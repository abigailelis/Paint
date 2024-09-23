class FBrillo extends Filters {

    constructor(ctx, width, height) {
        super(ctx, width, height);
    }

    doApplyFilter(data) {
        let index = 0;
        let brillo = 10;

        /* Recorre la matriz obtiene los valores de
         * colores de cada pixel y los setea sumandole el brillo a cada uno
         */
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                index = (x + (y * this.width)) * 4;

                let pixel = new Pixel(data);
                let colors = pixel.getColor(index);

                let r = colors.red + brillo;
                let g = colors.green + brillo;
                let b = colors.blue + brillo;

                pixel.setColor(r, g, b, index);
            }
        }
        updateMessage("Filtro brillo aplicado con éxito");
    }
}