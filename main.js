input = document.getElementsByTagName('input')[0]
ul = document.getElementsByTagName('ul')[0]

todos = JSON.parse(localStorage.getItem('todos')) || []

listTodos()
console.log(todos)

function addTodo() {
    if (input.value != '') {
        if (todos.indexOf(input.value) > -1) {
            alert('Ops, this todo already exist!')
        } else {
            todos.push(input.value)
            saveLocal()
            listTodos()
        }
    }
}

function listTodos() {
    ul.innerHTML = ''
    for (todo of todos) {
        button = document.createElement('button')
        button.textContent = 'Delete'
        button.style.margin = '0 10px'
        button.setAttribute('onclick', 'delTodo(' + todos.indexOf(todo) + ')')
        li = document.createElement('li')
        li.textContent = todo
        li.style.margin = '5px 0'
        li.appendChild(button)
        ul.appendChild(li)
    }
}

function delTodo(delTodo) {
    todos.splice(delTodo, 1)
    listTodos()
    saveLocal()
}

function saveLocal() {
    localStorage.setItem('todos_list', JSON.stringify(todos))
}