ul = document.getElementsByTagName('ul')[0]
// Updated to use the new ID for the input field
input = document.getElementById('newTodoInput')
prioritySelect = document.getElementById('prioritySelect') // Get the priority select element
dueDateInput = document.getElementById('dueDateInput') // Get the due date input element

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
            if (todo.todo === input.value)
                return alert('Ops, esta tarefa ja existe!')
        }
        // Get priority from the select element
        const priority = prioritySelect.value;
        todo = {
            id: todos.length, // This id might cause issues if todos are deleted. A better ID would be a UUID or timestamp.
            todo: input.value,
            done: false,
            priority: priority, // Add priority to the todo object
            dueDate: dueDateInput.value // Add due date to the todo object
        }
        todos.push(todo)
        // Clear the due date input after adding
        dueDateInput.value = '';
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



        span = document.createElement('span') // Create a span for the todo text
        const priority = todo.priority || 'Medium'; // Default to Medium if not set
        let displayText = todo.todo;
        displayText += ` (${priority})`;

        // Add due date to display text if it exists
        if (todo.dueDate) {
            displayText += ` [Due: ${todo.dueDate}]`;
        }

        span.textContent = displayText;
        span.setAttribute('onclick', 'editTodo(' + todos.indexOf(todo) + ')') // Add onclick to edit

        // Add class for styling based on priority
        span.classList.add('priority-' + priority.toLowerCase());
        // Potentially add class for overdue/due soon styling later

        li.appendChild(span)
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

function editTodo(index) {
    const li = ul.children[index];
    const span = li.querySelector('span'); // Find the span within the li
    // When editing, we should only edit the core todo text, not the priority suffix.
    // So, we retrieve the original todo text without the priority.
    const currentText = todos[index].todo;

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = currentText;

    // Function to save changes
    const saveChanges = () => {
        const newText = inputField.value.trim();
        if (newText && newText !== currentText) {
            todos[index].todo = newText; // Only update the text, priority remains unchanged during this edit
            saveLocal();
            listTodos(); // Re-render the list to show the updated static text
        } else {
            // If the text is empty or unchanged, revert to the original span
            // We need to ensure the original span (with priority) is put back if no changes.
            // listTodos() will handle recreating the correct span text, so just calling it is fine.
            listTodos();
        }
    };

    inputField.addEventListener('blur', saveChanges);
    inputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            inputField.removeEventListener('blur', saveChanges); // Avoid double saving if Enter also causes blur
            saveChanges();
        }
    });

    li.replaceChild(inputField, span); // Replace span with input field
    inputField.focus();
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