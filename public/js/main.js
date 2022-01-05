trash = document.querySelectorAll('.fa-trash')
up = document.querySelectorAll('.fa-arrow-circle-up')
down = document.querySelectorAll('.fa-arrow-circle-down')
todos = document.querySelectorAll('.todoItem')
finished = document.querySelectorAll('.complete')

function addClickEvent(elements, callback) {
    Array.from(elements).forEach(e => {
        e.addEventListener('click', callback)
    })
}

addClickEvent(trash, deleteTodo)
addClickEvent(up, raisePriority)
addClickEvent(down, lowerPriority)
addClickEvent(todos, complete)
addClickEvent(finished, redo)

const ENDPOINT = 'https://one-basic-crud.herokuapp.com'

async function deleteTodo() {
    const id = this.parentNode.dataset.id
    try {
        await fetch(ENDPOINT + '/api/delete-todo', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id
            }),
        })
        location.reload()
    } catch (e) {
        console.log(e)
    }
}

async function raisePriority() {
    try {
        await fetch(ENDPOINT + '/api/change-priority', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.parentNode.dataset.id,
                priority: Number(this.parentNode.childNodes[5].innerText),
                delta: -1
            })
        })
        location.reload()
    } catch (e) {
        console.log(e)
    }
}

async function lowerPriority() {
    try {
        await fetch(ENDPOINT + '/api/change-priority', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.parentNode.dataset.id,
                priority: Number(this.parentNode.childNodes[5].innerText),
                delta: 1
            })
        })
        location.reload()
    } catch (e) {
        console.log(e)
    }
}

async function complete() {
    try {
        await fetch(ENDPOINT + '/api/complete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.parentNode.dataset.id
            })
        })
        location.reload()
    } catch (e) {
        console.log(e)
    }
}

async function redo() {
    try {
        await fetch(ENDPOINT + '/api/redo', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.parentNode.dataset.id
            })
        })
        location.reload()
    } catch (e) {
        console.log(e)
    }
}