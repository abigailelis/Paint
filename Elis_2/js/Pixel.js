class Pixel {

    constructor(data){
        this.red = 0;
        this.green = 0;
        this.blue = 0;
        this.data = data;
    }

    /*-- Retorna los valores actuales del pixel --*/
    getColor(index){
        let red = this.data[index + 0];
        let green = this.data[index + 1];
        let blue = this.data[index + 2];

        return { red, green, blue }
    }

    /*-- Setea los valores RGB del pixel con los nuevos recibidos por parámetro --*/
    setColor(red, green, blue, index){
        this.data[index + 0] = red;
        this.data[index + 1] = green;
        this.data[index + 2] = blue;
    }

    /*-- Recibe un array de colores RGB y calcula el promedio --*/
    getAverage(colors){
        return (colors.red + colors.green + colors.blue) / 3;
    }
    
}