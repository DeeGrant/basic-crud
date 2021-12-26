trash = document.querySelectorAll('.fa-trash')
up = document.querySelectorAll('.fa-arrow-circle-up')
down = document.querySelectorAll('.fa-arrow-circle-down')

Array.from(trash).forEach(e => {
    e.addEventListener('click', deleteTodo)
})

Array.from(up).forEach(e => {
    e.addEventListener('click', raisePriority)
})

Array.from(down).forEach(e => {
    e.addEventListener('click', lowerPriority)
})

async function deleteTodo() {
    const id = this.parentNode.dataset.id
    try {
        await fetch('https://one-basic-crud.herokuapp.com/api/delete-todo', {
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
        await fetch('https://one-basic-crud.herokuapp.com/api/change-priority', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.parentNode.dataset.id,
                priority: Number(this.parentNode.childNodes[3].innerText),
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
        await fetch('https://one-basic-crud.herokuapp.com/api/change-priority', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.parentNode.dataset.id,
                priority: Number(this.parentNode.childNodes[3].innerText),
                delta: 1
            })
        })
        location.reload()
    } catch (e) {
        console.log(e)
    }
}