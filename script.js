const departamentosCapitales = [
    { departamento: 'Amazonas', capital: 'Leticia' },
    { departamento: 'Antioquia', capital: 'Medellín' },
    { departamento: 'Arauca', capital: 'Arauca' },
    { departamento: 'Atlántico', capital: 'Barranquilla' },
    { departamento: 'Bolívar', capital: 'Cartagena' },
    { departamento: 'Boyacá', capital: 'Tunja' },
    { departamento: 'Caldas', capital: 'Manizales' },
    { departamento: 'Caquetá', capital: 'Florencia' },
    { departamento: 'Casanare', capital: 'Yopal' },
    { departamento: 'Cauca', capital: 'Popayán' },
    { departamento: 'Cesar', capital: 'Valledupar' },
    { departamento: 'Chocó', capital: 'Quibdó' },
    { departamento: 'Córdoba', capital: 'Montería' },
    { departamento: 'Cundinamarca', capital: 'Bogotá' },
    { departamento: 'Guainía', capital: 'Inírida' },
    { departamento: 'Guaviare', capital: 'San José del Guaviare' },
    { departamento: 'Huila', capital: 'Neiva' },
    { departamento: 'La Guajira', capital: 'Riohacha' },
    { departamento: 'Magdalena', capital: 'Santa Marta' },
    { departamento: 'Meta', capital: 'Villavicencio' },
    { departamento: 'Nariño', capital: 'Pasto' },
    { departamento: 'Norte de Santander', capital: 'Cúcuta' },
    { departamento: 'Putumayo', capital: 'Mocoa' },
    { departamento: 'Quindío', capital: 'Armenia' },
    { departamento: 'Risaralda', capital: 'Pereira' },
    { departamento: 'San Andrés y Providencia', capital: 'San Andrés' },
    { departamento: 'Santander', capital: 'Bucaramanga' },
    { departamento: 'Sucre', capital: 'Sincelejo' },
    { departamento: 'Tolima', capital: 'Ibagué' },
    { departamento: 'Valle del Cauca', capital: 'Cali' },
    { departamento: 'Vaupés', capital: 'Mitú' },
    { departamento: 'Vichada', capital: 'Puerto Carreño' }
];

let departamentoActual;
let capitalCorrecta;
let opcionesCapitales = [];
let puntuacion = 0;
let correctas = 0;
let incorrectas = 0;

const departamentoElement = document.getElementById('departamento');
const opcionesElement = document.getElementById('opciones');
const resultadoElement = document.getElementById('resultado');
const puntuacionElement = document.getElementById('puntuacion');
const botonesOpciones = document.querySelectorAll('.opcion');

function obtenerDepartamentoAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * departamentosCapitales.length);
    return departamentosCapitales[indiceAleatorio];
}

function generarOpciones(departamento) {
    const capitalCorrecta = departamento.capital;
    const opciones = [capitalCorrecta];

    while (opciones.length < 4) {
        const capitalAleatoria = departamentosCapitales[Math.floor(Math.random() * departamentosCapitales.length)].capital;
        if (!opciones.includes(capitalAleatoria)) {
            opciones.push(capitalAleatoria);
        }
    }

    for (let i = opciones.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opciones[i], opciones[j]] = [opciones[j], opciones[i]];
    }

    return opciones;
}

function mostrarPregunta() {
    departamentoActual = obtenerDepartamentoAleatorio();
    capitalCorrecta = departamentoActual.capital;
    opcionesCapitales = generarOpciones(departamentoActual);

    departamentoElement.textContent = departamentoActual.departamento;

    botonesOpciones.forEach((boton, indice) => {
        boton.textContent = opcionesCapitales[indice];
        boton.onclick = () => verificarRespuesta(opcionesCapitales[indice]);
        boton.classList.remove('correcto', 'incorrecto');
    });

    resultadoElement.textContent = '';
    actualizarContadores(); // Llamamos a la función para mostrar los contadores al inicio de cada pregunta
}

function verificarRespuesta(capitalSeleccionada) {
    if (capitalSeleccionada === capitalCorrecta) {
        resultadoElement.textContent = '¡Correcto!';
        resultadoElement.className = 'correcto';
        puntuacion++;
        correctas++;
    } else {
        resultadoElement.textContent = `Incorrecto. La capital de ${departamentoActual.departamento} es ${capitalCorrecta}.`;
        resultadoElement.className = 'incorrecto';
        incorrectas++;
    }
    puntuacionElement.textContent = puntuacion;
    actualizarContadores(); // Actualizamos los contadores después de cada respuesta
    setTimeout(mostrarPregunta, 1500);
}

function actualizarContadores() {
    const correctasElement = document.getElementById('correctas');
    const incorrectasElement = document.getElementById('incorrectas');

    if (!correctasElement) {
        const contadoresDiv = document.createElement('div');
        contadoresDiv.innerHTML = '<p>Correctas: <span id="correctas">0</span></p><p>Incorrectas: <span id="incorrectas">0</span></p>';
        document.querySelector('.container').appendChild(contadoresDiv);
    } else {
        correctasElement.textContent = correctas;
        incorrectasElement.textContent = incorrectas;
    }
}

mostrarPregunta();