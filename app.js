// declaración inicial de variables
const inputTarea = document.querySelector('.inputTarea')
const btnEnviar = document.querySelector('.enviar')
const lista = document.querySelector('.tareas')
const listaErrores = {
	elemExiste: 'Este elemento ya existe en la lista.',
	introTexto: 'Introduce texto válido.',
	numerosNo: 'No vale introducir un número.',
}
//función que recoge el texto del usuario
const grabaTexto = (event) => {
	event.preventDefault()
	const tareaActual = inputTarea.value.toLowerCase()
	const listaTareas = lista.querySelectorAll('label')
	if (!inputTarea.value) {
		mostrarAlerta(listaErrores.introTexto)
		const ocultar = setTimeout(ocultarAlerta, 2000)
		return
	}
	if (parseInt(inputTarea.value) || inputTarea.value === '0') {
		mostrarAlerta(listaErrores.numerosNo)
		const ocultar = setTimeout(ocultarAlerta, 2000)
		return
	}
	for (let i = 0; i < listaTareas.length; i++) {
		if (tareaActual == listaTareas[i].innerText.toLowerCase()) {
			mostrarAlerta(listaErrores.elemExiste)
			const ocultar = setTimeout(ocultarAlerta, 2000)
			return
		}
	}
	const elemLista = document.createElement('li')
	elemLista.classList.add('elem-lista')
	const idTarea = tareaActual.split(' ').join('')
	console.log(idTarea)
	console.log(tareaActual.split(' '))
	console.log([...tareaActual])
	const tareaHtml = `
        <input type="checkbox" name="${idTarea}" id="${idTarea}">
        <label for="${idTarea}" class="texto">${tareaActual}</label>
        <span class="editar">&#128393;</span>
        <span class="cerrar">&times;</span>
    `
	elemLista.innerHTML = tareaHtml
	lista.append(elemLista)
	inputTarea.value = ''
	elemLista
		.getElementsByClassName('cerrar')[0]
		.addEventListener('click', eliminarElemLista)
	elemLista
		.getElementsByClassName('editar')[0]
		.addEventListener('click', editarElemLista)
}
btnEnviar.addEventListener('click', grabaTexto) //listener de la función que recoge el texto

//función para eliminar tarea
const eliminarElemLista = (event) => {
	const elemEliminado = event.target.parentElement
	elemEliminado.remove()
}

//función para editar un elemento de la lista
const editarElemLista = (event) => {
	const elemEditado = event.target.parentElement
	const textoTarea = elemEditado.querySelector('label')
	const textoEditar = textoTarea.innerText
	inputTarea.value = textoEditar
	elemEditado.remove()
}

//funciones para mostrar y ocultar alerta
const mostrarAlerta = (error) => {
	const alerta = document.createElement('div')
	alerta.classList.add('alerta')
	const contenidoAlerta = error
	alerta.innerText = contenidoAlerta
	document.querySelector('.contenedor').append(alerta)
}
const ocultarAlerta = () => document.querySelector('.alerta').remove()
