/** @Type {HTMLCanvasElement} */
/** @Type {CanvasRenderingContext2D} */

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d', { willReadFrequently: true });

let width = canvas.width;
let height = canvas.height;

let mouseUp = true;
let mouseDown = false;
let isDrawingFigure = false;

let myPen, myEraser, myImage, selectedTool, imageData, startX, startY, finX, finY;

/*---------------------- CANVAS --------------------------*/

/*-- Construye el canvas al inicio. --*/

function main() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    myImage = new Imagen (ctx, width, height);
}

/*-- Borra y reinicia el canvas --*/

document.getElementById('cleanCanvas').addEventListener('click', cleanCanvas);

function cleanCanvas(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
}


/*---------------------- LÁPIZ Y BORRADOR -----------------------------*/

/*-- Funcionalidad del mouse para el lapiz y el borrador --*/

canvas.addEventListener('mouseup', () => {
    mouseDown = false;
    mouseUp = true;
})

canvas.addEventListener('mousedown', (e) => {
    startX = e.offsetX;
    startY = e.offsetY;
    mouseDown = true;
    mouseUp = false;
    /* Si está utilizando el lapiz o el borrador */
    if(!isDrawingFigure && selectedTool != null)
        selectedTool.moveTo(startX, startY);
    /* Si está dibujando una figura */
    else
        imageData = ctx.getImageData(0, 0, width, height);
})

canvas.addEventListener('mousemove', (e)=>{
    if(mouseDown){
        /* Solo ingresa con el lápiz o el borrador */
        if(!isDrawingFigure && selectedTool != null){
            selectedTool.draw(e.offsetX, e.offsetY);
            selectedTool.moveTo(e.offsetX, e.offsetY);
        }
        /* Ingresa al dibujar una figura, borra y actualiza el canvas
         * para crear el efecto de movimiento del dibujo de la figura
         */
        else if(isDrawingFigure) {
            cleanCanvas();
            ctx.putImageData(imageData, 0, 0);
            selectedTool.draw(startX, startY, e.offsetX, e.offsetY);
        }
    }
})

/*------------------------- LAPIZ Y BORRADOR ---------------------------------*/

/*-- Crea el lapiz al hacer click en el boton "pencil" --*/

document.getElementById('pencil').addEventListener('click', (e)=>{
    if(myPen == null)
        myPen = new Pencil(e.offsetX, e.offsetY, ctx, getColor(), getWidth());
    else
        myPen.setColor(getColor());
    isDrawingFigure = false;
    selectedTool = myPen;
    updateMessage("Lapiz seleccionado.");
})


/*-- Crea el borrador al hacer click en el boton "eraser" --*/

document.getElementById('eraser').addEventListener('click', (e)=>{
    if(myEraser == null)
        myEraser = new Eraser(e.offsetX, e.offsetY, ctx, getWidth());
    else
        myEraser.setColor();
    isDrawingFigure = false;
    selectedTool = myEraser;
    updateMessage("Borrador seleccionado.");
})


/*------------------------------- FIGURAS -----------------------------------*/

function selectFigure(figure){
    isDrawingFigure = true;
    selectedTool = figure;
    updateMessage("Figura seleccionada");
}
/*-- Crea un rectángulo --*/

document.getElementById('rectangle').addEventListener('click', ()=>{
    selectFigure(new Rectangle(startX, startY, ctx, getColor(), getWidth()));
})

/*-- Crea un círculo --*/

document.getElementById('circle').addEventListener('click', ()=>{
    selectFigure(new Circle(startX, startY, ctx, getColor(), getWidth()));
})

/*------------- CONFIGURACIÓN DE HERRAMIENTAS DE DIBUJO ----------------------*/


/*-- Modifica el color de la herramienta seleccionada--*/

let color = document.getElementById('color');
color.addEventListener('input', updateColor);

function updateColor(){
    if(selectedTool != null)
        selectedTool.setColor(getColor());
}

function getColor(){
    return hexToRgba(color.value);
}

/*-- Convierte el valor hexadecimal a RGBA del color seleccionado --*/

function hexToRgba(hex) {
    const alpha = 1;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


/*-- Modifica el ancho de la herramienta seleccionada --*/

let select = document.getElementById('width-tool');
select.addEventListener('change', updateWidth);

function getWidth(){
    return select.options[select.selectedIndex].value;
}

function updateWidth(){
    if(selectedTool != null)
        selectedTool.setWidth(getWidth());
}


/*------------------------------- IMÁGEN -----------------------------------*/

/*-- Carga una imagen --*/

let file_input = document.getElementById('file');

file_input.addEventListener('change', (e)=>{
    myImage.loadImage(e.target.files[0]);
    e.target.files.value = null;
});


/*-- Guarda la imagen del canvas creando un elemento anchor --*/

document.getElementById('save').addEventListener('click', (e) =>{
    let link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});


/*------------------------------- FILTROS  -----------------------------------*/


/*-- Escala de grises --*/

document.getElementById('f-gray').addEventListener('click', ()=>{
    new FGray(ctx, width, height).applyFilter();
})

/*-- Filtro Sepia --*/

document.getElementById('f-sepia').addEventListener('click', ()=>{
    new FSepia(ctx, width, height).applyFilter();
})

/*-- Filtro Monocromatico - Binarización --*/

document.getElementById('f-monocromo').addEventListener('click', ()=>{
    new FMonochromatic(ctx, width, height).applyFilter();
})

/*-- Filtro Negative --*/

document.getElementById('f-negative').addEventListener('click', ()=>{
    new FNegative(ctx, width, height).applyFilter();
})

/*-- Filtro Brillo --*/

document.getElementById('f-brillo').addEventListener('click', ()=>{
    new FBrillo(ctx, width, height).applyFilter();
})

/*-- Filtro Saturación --*/

document.getElementById('f-saturacion').addEventListener('click', ()=>{
    new FSaturacion(ctx, width, height).applyFilter();
})

/*-- Filtro Blur - Kernel --*/

document.getElementById('f-blur').addEventListener('click', ()=>{
    new FBlur(ctx, width, height).applyFilter();
})

/*-- Filtro Detección de bordes --*/

document.getElementById('f-det-bordes').addEventListener('click', ()=>{
    new FBordes(ctx, width, height).applyFilter();
})



/*-------------------------- VISOR DE ACTIVIDAD ------------------------------*/

function updateMessage(msg){
    document.getElementById('visor').innerHTML = `${msg}`;
}