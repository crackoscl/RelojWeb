const canvas = document.getElementById('relojCanvas');
const ctx = canvas.getContext('2d');

const imagenes = {
    fondo: new Image(),
    hora: new Image(),
    minuto: new Image(),
    segundo: new Image(),
    dialDer: new Image(),
    dialIzq: new Image(),
    luna: new Image()
};

const rutas = {
    fondo: 'partes/fondopro.png',
    hora: 'partes/horap.png',
    minuto: 'partes/minutop.png',
    segundo: 'partes/segundop.png',
    dialDer: 'partes/dialderecho.png',
    dialIzq: 'partes/dializq.png',
    luna: 'partes/diaLuna.png'
};

let cargadas = 0;
const total = Object.keys(rutas).length;

function iniciarSiTodoCargo() {
    cargadas++;
    if (cargadas === total) {
        requestAnimationFrame(actualizar);
    }
}

Object.keys(rutas).forEach(key => {
    imagenes[key].onload = iniciarSiTodoCargo;
    imagenes[key].src = rutas[key];
});

function dibujarImagenRotada(img, x, y, angulo) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angulo * Math.PI) / 180);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();
}


function calcularLuna() {
    const ahora = new Date();
    const fechaBase = new Date(2000, 0, 6, 20, 14, 0); // 947196840
    const diff = (ahora - fechaBase) / 86400000;
    const edadLunar = diff % 29.53059;
    return 150 - ((edadLunar / 29.53059) * 120);
}

function actualizar() {
    const ahora = new Date();
    const horas = ahora.getHours() % 12;
    const minutos = ahora.getMinutes();
    const segundos = ahora.getSeconds();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imagenes.fondo, 0, 0, 350, 350);

    // Cálculos de rotación
    const angSeg = segundos * 6;
    const angMin = minutos * 6 + segundos * 0.1;
    const angHor = horas * 30 + minutos * 0.5;

    const angFecha = (ahora.getDate() - 31) * (360 / 31);
    const getDia = ahora.getDay()
    const angDia = (getDia === 0) ? 6 : diaJS - 1 * (360 / 7);

    const angLuna = calcularLuna();

    // Dibujar manecillas principales
    dibujarImagenRotada(imagenes.hora, 175, 175, angHor - 90);
    dibujarImagenRotada(imagenes.minuto, 175, 175, angMin - 90);
    dibujarImagenRotada(imagenes.segundo, 175, 175, angSeg);

    dibujarImagenRotada(imagenes.dialDer, 246, 176, angFecha - 90);
    dibujarImagenRotada(imagenes.dialIzq, 104, 176, angDia - 90);
    dibujarImagenRotada(imagenes.luna, 175, 245, angLuna);

    requestAnimationFrame(actualizar);
}

window.onload = () => {
    actualizar();
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }
};