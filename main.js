input = document.getElementsByTagName('input')[0]
ul = document.getElementsByTagName('ul')[0]

todos = [
    'Make coffee',
    'Check trello',
    'Study Javascript'
]

listTodos()
console.log(todos)

function addTodo() {
    if (input.value != '') {
        if (todos.indexOf(input.value) > -1) {
            alert('Ops, this todo already exist!')
        } else {
            todos.push(input.value)
            listTodos()
            console.log(todos)
        }
    }
}

function listTodos() {
    ul.innerHTML = ''
    for (todo of todos) {
        li = document.createElement('li')
        button = document.createElement('button')
        button.textContent = 'Delete'
        todoDel = todos.indexOf(todo)
        button.setAttribute('onclick', 'delTodo(' + todoDel + ')')
        button.style.margin = '0 10px'
        li.textContent = todo
        li.style.margin = '5px 0'
        li.appendChild(button)
        ul.appendChild(li)
    }
}

function delTodo(delTodo) {
    todos.splice(delTodo, 1)
    listTodos()
}