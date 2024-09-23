class FSaturacion extends Filters {

    constructor(ctx, width, height) {
        super(ctx, width, height);
    }

    /* 1- Obtiene los colores actuales del pixel.
     * 2- Convierte los colores de RGB a HSL.
     * 3- Ajusta la saturación.
     * 4- Convierte los valores de nuevo de HSL a RGB.
     * 5- Setea los valores del pixel con los nuevos obtenidos.
     */
    doApplyFilter(data) {
        let saturation = 1, index = 0;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                index = (x + (y * this.width)) * 4;

                let pixel = new Pixel(data);
                let colors = pixel.getColor(index);

                const { h, s, l } = this.rgbToHsl(colors.red, colors.green, colors.blue);
                const newSaturation = s * saturation;
                const { r: newRed, g: newGreen, b: newBlue } = this.hslToRgb(h, newSaturation, l);

                pixel.setColor(newRed, newGreen, newBlue, index);
            }
        }
        updateMessage("Filtro saturación aplicado con éxito");
    }
}


