trash = document.querySelectorAll('.fa-trash')
up = document.querySelectorAll('.fa-arrow-circle-up')
down = document.querySelectorAll('.fa-arrow-circle-down')

Array.from(trash).forEach(e => {
    e.addEventListener('click', deleteTodo)
})

Array.from(up).forEach(e => {
    e.addEventListener('click', raisePriority)
})

// Array.from(down).forEach(e => {
//     e.addEventListener('click', lowerPriority)
// })

async function deleteTodo() {
    const id = this.parentNode.dataset.id
    try {
        const response = await fetch('http://localhost:8000/api/delete-todo', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id
            }),
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (e) {
        console.log(e)
    }
}

async function raisePriority() {
    const id = this.parentNode.dataset.id
    const priority = Number(this.parentNode.childNodes[3].innerText)
    try {
        const response = await fetch('http://localhost:8000/api/change-priority', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id,
                priority: priority,
                delta: 1
            })
        })
        const data = response.json()
        console.log(data)
        location.reload()
    } catch (e) {
        console.log(e)
    }
    console.log(id)
}