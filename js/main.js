import { ref, set, update } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js"
import { db } from "../js/firebase.js"
import { handleDrag, validateEmail } from "../js/helpers.js"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

$(document).ready(function () {

    const responses = []
    var respuesta

    // -- Preguntas 1 a 4

    const botonEnviar1 = document.getElementById("enviar1")
    const botonEnviar2 = document.getElementById("enviar2")
    const botonEnviar3 = document.getElementById("enviar3")
    const botonEnviar4 = document.getElementById("enviar4")

    const botones = document.getElementsByClassName("btn-option")

    for (const boton of botones) {
        boton.onclick = e => {
            for (const boton of botones) {
                boton.classList.remove("active")
            }
            e.target.classList.add("active")
            document.getElementById(e.target.dataset.pregunta).disabled = false
            respuesta = e.target.value
        }
    }

    botonEnviar1.onclick = () => {
        responses[0] = respuesta
        console.log(responses)
    }

    botonEnviar2.onclick = () => {
        responses[1] = respuesta
        console.log(responses)
    }

    botonEnviar3.onclick = () => {
        responses[2] = respuesta
        console.log(responses)
    }

    botonEnviar4.onclick = () => {
        responses[3] = respuesta
        console.log(responses)
    }


    // -- Pregunta 5 (Checkboxes)

    const botonEnviar5 = document.getElementById("enviar5")
    const pregunta5 = []
    const chekcboxis = document.getElementsByClassName("check-option")
    for (const checkboton of chekcboxis) {
        checkboton.onclick = e => {
            const checkboxes = document.querySelectorAll('input[name="preg5"]:checked')
            botonEnviar5.disabled = checkboxes.length == 0
            respuesta = e.target.value
        }
    }

    botonEnviar5.onclick = () => {
        const checkboxes = document.querySelectorAll('input[name="preg5"]:checked')
        if (checkboxes.length > 0) {
            checkboxes.forEach((checkbox) => {
                pregunta5.push(checkbox.value)
            })
        }
        console.log(pregunta5)
    }


    // -- Pregunta 6 (Draggable)

    const botonEnviar6 = document.getElementById("enviar6")
    const ordenRespuestas = []

    const draggables = document.getElementsByTagName("li")

    for (const draggable of draggables) {
        draggable.draggable = true
        draggable.ondrag = e => handleDrag(e)
    }

    botonEnviar6.onclick = e => {
        var ordenamiento = $('#draggable-list').sortable('toArray')
        console.log(ordenamiento)
        ordenRespuestas.push(ordenamiento)
    }

    $('#draggable-list').sortable({
        group: 'list',
        animation: 200,
        ghostClass: 'ghost',
    })


    // -- Informacion de contacto

    const nombre = document.getElementById("nombre")
    const apellido = document.getElementById("apellido")
    const empresa = document.getElementById("empresa")
    const cargolaboral = document.getElementById("cargolaboral")
    const email = document.getElementById("email")
    const celular = document.getElementById("celular")

    const insBtn = document.getElementById("insBtn")

    var idCliente

    email.addEventListener('input', updateValue)
    nombre.addEventListener('input', updateValue)
    apellido.addEventListener('input', updateValue)
    empresa.addEventListener('input', updateValue)
    cargolaboral.addEventListener('input', updateValue)
    celular.addEventListener('input', updateValue)

    function updateValue() {
        if (email.value && nombre.value && apellido.value && cargolaboral.value && celular.value && empresa.value && validateEmail(email.value)) {
            insBtn.disabled = false
        }
        else {
            insBtn.disabled = true
        }
    }

    function InsertData() {
        mostrarSugerencias()
        idCliente = Date.now()
        set(ref(db, "Encuestado/" + idCliente), {
            Dominio: email.value.substring(email.value.lastIndexOf("@") + 1),
            Nombre: nombre.value,
            Email: email.value,
            Apellido: apellido.value,
            Empresa: empresa.value,
            CargoLaboral: cargolaboral.value,
            Celular: celular.value,
            Vuelta_al_trabajo: responses[0],
            Dispositivos_móviles: responses[1],
            Almacenamiento: responses[2],
            Colaboracion: responses[3],
            Seguridad: pregunta5,
            Ordena: ordenRespuestas,
        })
            .then(() => {
                // alert("succesfull")
            })
            .catch((error) => {
                alert("unsuccessfull, error" + error)
            })
    }

    function mostrarSugerencias() {
        document.getElementById("parrafo-cliente").innerText = `${nombre.value}, en ${empresa.value} hay mucho trabajo por hacer e IPLAN con Google Workspace sabe cómo ayudarte:`

        // TODO: Respuestas 1

        switch (responses[1]) {
            case "Sí, pero sólo utilizar el correo electrónico":
                document.getElementById("parrafo-respuesta-2").innerText = "Podés sumar más aplicaciones mobiles para colaborar de manera completa y flexible."
                break
            case "No, sólo desde la computadora laboral":
                document.getElementById("parrafo-respuesta-2").innerText = "Brindá mayor flexibilidad para colaborar sin perder seguridad sumando aplicaciones mobiles."
                break
            case "Sí, con varias aplicaciones":
                document.getElementById("parrafo-respuesta-2").innerText = "Podés continuar mejorando la productividad de tus equipos colaborando de manera completa y flexible."
                break
            default:
                break
        }

        switch (responses[2]) {
            case "En la nube":
                document.getElementById("parrafo-respuesta-3").innerText = "Podemos ayudarte con la migración de todos tus archivos."
                break
            case "File server on premise":
                document.getElementById("parrafo-respuesta-3").innerText = "Podés reducir costos de infraestructura."
                break
            case "Híbrido":
                document.getElementById("parrafo-respuesta-3").innerText = "Podés reducir costos de infraestructura."
                break
            default:
                break
        }

        switch (responses[3]) {
            case "Difícilmente colaboramos, particularmente lo hacen algunos equipos":
                document.getElementById("parrafo-respuesta-4").innerText = "Podés aumentar la productividad de todos tus equipos."
                break
            case "Las personas están confundidas sobre qué aplicaciones usar":
                document.getElementById("parrafo-respuesta-4").innerText = "Podés unificar y simplicar la colaboración."
                break
            case "Nuestros equipos colaboran efectivamente con aplicaciones en la nube":
                document.getElementById("parrafo-respuesta-4").innerText = "Podés seguir mejorando la productividad de tus equipos."
                break
            case "Estamos evaluando soluciones de productividad y colaboración en la nube":
                document.getElementById("parrafo-respuesta-4").innerText = "Te encontramos en el camino correcto."
                break
            default:
                break
        }
    }

    insBtn.addEventListener('click', InsertData)


    // -- Contactarme

    const contactarmeBtn = document.getElementById("contactarme")
    const lastText = document.getElementById("contactado")

    function contactarCliente() {
        update(ref(db, "Encuestado/" + idCliente + "/"), {
            ContactarCliente: "SI",
        })
            .then(() => {
                contactarmeBtn.classList.add('class-1')
                lastText.classList.remove('class-1')
                // alert("succesfull")
            })
            .catch((error) => {
                alert("unsuccessfull, error" + error)
            })
    }

    contactarmeBtn.addEventListener('click', contactarCliente)

    const descargarBtn = document.getElementById("descargar")

    function descargarPdf() {
        const contenidoPromesa = html2canvas(document.querySelector("#capture"), {
            onclone: function (documentClone) {
                documentClone.querySelector("#capture").style.width = "690px"
                documentClone.querySelector("#capture-footer").classList.add('class-1')
            }
        })
        const encabezadoPromesa = html2canvas(document.querySelector("#capture-header"), {
            onclone: function (documentClone) {
                documentClone.querySelector("#capture-header").style.width = "695px"
            }
        })

        Promise.all([contenidoPromesa, encabezadoPromesa])
            .then(([canvas, header]) => {
                const pdf = new jsPDF('p', 'mm', 'a4')
                const imgData = canvas.toDataURL('image/jpeg', 1.0)
                const imgHeader = header.toDataURL('image/jpeg', 1.0)
                pdf.addImage(imgHeader, 'JPEG', 10, 10, 190, 23)
                pdf.addImage(imgData, 'JPEG', 10, 40, 190, 164)
                pdf.save('formulario-iplan.pdf')
            })
    }

    descargarBtn.addEventListener('click', descargarPdf)
})