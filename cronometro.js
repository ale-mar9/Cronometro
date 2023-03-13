const spanMinuto = document.getElementById("minuto")
const spanSegundos = document.getElementById("segundo")
const spanMilisegundos = document.getElementById("milesima")
const parrafo = document.getElementById("parrafo")
const lista = document.getElementById("lista")

const inicio = document.getElementById("inicio");
const pausa = document.getElementById("pausa");
const reiniciar = document.getElementById("reiniciar");
const bandera = document.getElementById("bandera");

inicio.addEventListener("click", accion1)
pausa.addEventListener("click", accion1)
reiniciar.addEventListener("click", reinicio)

let minuto="00";
let segundo="00";
let milisegundos="00";
let corriendo=null;

const ocultarElemento = (elemento) => {elemento.style.display="none"};
const mostrarElemento = (elemento)=> elemento.style.display="";
ocultarElemento(pausa)
ocultarElemento(reiniciar)
mostrarElemento(inicio)
ocultarElemento(bandera)

function mostrarTiempo(){spanMinuto.innerHTML = minuto; spanSegundos.innerHTML = segundo; spanMilisegundos.innerHTML = milisegundos;}
function agregarCeroS(){if (segundo < 10){segundo = "0" + segundo} else{segundo = segundo}}

function agregarCeroM(){if (minuto < 10){minuto = "0" + minuto} else{minuto = minuto}}

function accion1(){
    if (corriendo){detener(); ocultarElemento(pausa); mostrarElemento(reiniciar); mostrarElemento(inicio); ocultarElemento(bandera);} 
    else{iniciar(); mostrarElemento(pausa); ocultarElemento(reiniciar); ocultarElemento(inicio); mostrarElemento(bandera);}}

function iniciar(){
    const incrementarMs = () =>{
        if (milisegundos === 99){
            milisegundos = 0
            segundo++
            if (segundo === 59){
                segundo = 0
                minuto++
                agregarCeroM()
            } else{
                agregarCeroS()
            }
        } else{
            milisegundos++
        }
        mostrarTiempo();
    }
    corriendo = setInterval(incrementarMs, 10)
    cuadradoInicio()
}

function detener(){
    clearInterval(corriendo);
    corriendo=null;
    ocultarElemento(pausa);
    mostrarElemento(reiniciar);
    mostrarElemento(inicio);
    ocultarElemento(bandera);
    cuadradoDetener()
}

function reinicio(){
    minuto="00";
    segundo= "00";
    milisegundos= "00";
    mostrarTiempo()
    ocultarElemento(pausa)
    ocultarElemento(reiniciar)
    mostrarElemento(inicio)
    ocultarElemento(bandera)
    caja.innerHTML = ""
    i=0;
    cuadradoReiniciar();
}

class banderas{
    constructor(minutos, segundos, milisegundo){
        this.minuto= minutos;
        this.segundo= segundos;
        this.milisegundos= milisegundo;
    }
}

let instancias = [];
let i = 0;
let caja = document.getElementById("lista")

function registro(){
    i++
    instancias = new banderas(spanMinuto.innerHTML, spanSegundos.innerHTML, spanMilisegundos.innerHTML);
    revelar()
}

function revelar(){
    let contenido = document.createElement("p")
    contenido.textContent = `${i}) ${instancias.minuto}: ${instancias.segundo}. ${instancias.milisegundos}`
    caja.appendChild(contenido)
}

bandera.addEventListener("click", registro)

const cuadrado = document.getElementById("cuadrado")

function cuadradoInicio(){
    cuadrado.classList.add("text-green-400")
    cuadrado.classList.remove("text-white")
    cuadrado.classList.remove("text-red-400")
}

function cuadradoDetener(){
    cuadrado.classList.add("text-red-400")
}

function cuadradoReiniciar(){
    cuadrado.classList.add("text-white")
}