class FBordes extends Filters {

    constructor(ctx, width, height) {
        super(ctx, width, height);
    }

    doApplyFilter(data) {
        
        let intensity = [];
        let magnitudeX = 0, magnitudeY = 0, kernelSize = 3;
    
        let kernelX = [[-1, 0, 1],
                       [-2, 0, 2],
                       [-1, 0, 1]];
        let kernelY = [[-1, -2, -1],
                       [0, 0, 0],
                       [1, 2, 1]];

        /* Crea una matriz "intensity" con el promedio de los colores
         * de cada pixel del ImageData
         */
    
        for (let i = 0; i < this.height; i++) {
            intensity[i] = [];
            for (let j = 0; j < this.width; j++) {
                let index = (i * this.width + j) * 4;
                let pixel = new Pixel(data);
                let colors = pixel.getColor(index);
                let average = pixel.getAverage(colors);
                intensity[i][j] = average;
            }
        }
    
        /**
         * Recorre la matriz de imageData.data para calcular la magnitudX y magnitudY de cada pixel
         * y luego modifica los valores de dicho pixel todos con el mismo color.
         */
        for (let x = 1; x < this.width - 1; x++) {
            for (let y = 1; y < this.height - 1; y++) {
                let pixel = new Pixel(data);
                magnitudeX = 0;
                magnitudeY = 0;
    
                for (let i = 0; i < kernelSize; i++) {
                    for (let j = 0; j < kernelSize; j++) {
                        let xn = x + i - 1;
                        let yn = y + j - 1;
                        magnitudeX += intensity[yn][xn] * kernelX[i][j];
                        magnitudeY += intensity[yn][xn] * kernelY[i][j];
                    }
                }
    
                let color = parseInt(Math.sqrt(magnitudeX ** 2 + magnitudeY ** 2));
                let index = (y * this.width + x) * 4;
                pixel.setColor(color, color, color, index);
            }
        }
        updateMessage("Filtro detección de bordes aplicado con éxito");
    }
}




