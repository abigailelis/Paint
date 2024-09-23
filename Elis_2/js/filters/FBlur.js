class FBlur extends Filters {
    
    constructor(ctx, width, height) {
        super(ctx, width, height);
    }

    doApplyFilter(data) {
        let index = 0;
        let kernel = [];
        let kernelSize = 3;

        /*-- Setea todos los valores de la matriz kernel en 1 --*/

        for (let i = 0; i < kernelSize; i++){
            kernel [i] = [];
            for (let j = 0; j < kernelSize; j++)
                kernel [i][j] = 1;
        }

        /*-- Recorre la matriz para obtener los pixeles a modificar --*/

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {

                let pixel = new Pixel(data);
                let sumR = 0, sumG = 0, sumB = 0, cont = 0;

                /* Recorre la matriz kernel para realizar la suma de los adyacentes y
                 * poder obtener el promedio para modificar el pixel (x,y) sobre el cual
                 * estoy posicionado.
                 */
                for(let i = 0; i < kernelSize; i++){
                    for (let j = 0; j < kernelSize; j++){
                        
                        let offsetX = x + i - Math.floor(kernelSize / 2);
                        let offsetY = y + j - Math.floor(kernelSize / 2);

                        if (offsetX >= 0 && offsetX < this.width && offsetY >= 0 && offsetY < this.height){
                            cont++;
                            index = (offsetX + (offsetY * this.width)) * 4;

                            let v = kernel[i][j];

                            sumR += data[index + 0] * v;
                            sumG += data[index + 1] * v;
                            sumB += data[index + 2] * v;
                        }
                    }
                }

                index = (x + (y * this.width)) * 4;
                pixel.setColor((sumR/cont), (sumG/cont), (sumB/cont), index);
            }
        }

        updateMessage("Filtro blur aplicado con éxito");
    }
}