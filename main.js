ul = document.getElementsByTagName('ul')[0]
input = document.getElementsByTagName('input')[0]
input.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        addTodo()
    }
})
todos = JSON.parse(localStorage.getItem('todos_list')) || []
listTodos()
user = []
currentTodo = {}


axios.get('https://api.github.com/users/jhonathannc')
    .then(function(response) {
        user.name = response.data.name
        user.img = response.data.avatar_url
        user.url = response.data.html_url
        JSON.stringify(user)
        setFooter(user)
    })
    .catch(function(error) {
        console.log(error)
    })

function addTodo() {
    if (input.value != '') {
        for (todo of todos) {
            if (todo.todo.indexOf(input.value) > -1)
                return alert('Ops, esta tarefa ja existe!')

        }
        todo = {
            id: todos.length,
            todo: input.value,
            done: false
        }
        todos.push(todo)
        saveLocal()
        listTodos()
        return input.value = ''

    }
}

function listTodos() {
    ul.innerHTML = ''
    for (todo of todos) {
        button = document.createElement('button')
        button.textContent = 'Deletar'
        button.style.margin = '0 10px'
        button.setAttribute('onclick', 'delTodo(' + todos.indexOf(todo) + ')')
        li = document.createElement('li')
        checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.setAttribute('onclick', 'checkTodo(' + todos.indexOf(todo) + ')')
        checkbox.setAttribute('id', todos.indexOf(todo))
        li.appendChild(checkbox)
        li.appendChild(document.createTextNode(todo.todo))
        li.style.margin = '5px 0'
        li.appendChild(button)
        ul.appendChild(li)
        if (todo.done === true) {
            checkbox.checked = true
            li.style.textDecoration = 'line-through'
        }
    }

}

function checkTodo(checkTodo) {
    checkBox = document.getElementById(checkTodo)
    if (checkBox.checked == true)
        todos[checkTodo].done = true
    else
        todos[checkTodo].done = false
    saveLocal()
    listTodos()
}

function delTodo(delTodo) {
    todos.splice(delTodo, 1)
    listTodos()
    saveLocal()
}

function saveLocal() {
    localStorage.setItem('todos_list', JSON.stringify(todos))
}

function setFooter(user) {
    usern = document.createElement('p')
    aUser = document.createElement('a')
    divUser = document.createElement('div')
    aUser.href = user.url
    aUser.innerHTML = user.name
    aUser.style = 'margin: 0 .2rem'
    usern.style = 'white-space: nowrap'
    usern.innerHTML = 'Criado por: '
    divUser.style = 'display: flex; align-items: center'
    divUser.appendChild(usern)
    divUser.appendChild(aUser)
    div = document.createElement('div')
    div.classList.add('footer')
    img = document.createElement('img')
    img.setAttribute('src', user.img)
    img.style.borderRadius = '50%'
    img.style.width = '50px'
    img.style.heigth = '50px'
    img.style.margin = '5px'
    div.appendChild(img)
    div.appendChild(divUser)
    aProject = document.createElement('a')
    aProject.style = 'font-weight: bold'
    aProject.href = 'https://github.com/jhonathannc/todos-list/issues/1'
    aProject.innerHTML = 'Confira andamento deste projeto'
    document.getElementById('app').appendChild(div)
    document.getElementById('app').appendChild(aProject)

}