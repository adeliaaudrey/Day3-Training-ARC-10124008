document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const todoList = document.getElementById('todoList');

    // Fetch all todos
    fetch('/todos')
        .then(response => response.json())
        .then(todos => {
            todos.forEach(todo => {
                addTodoToDOM(todo);
            });
        });

    // Add new todo
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        
        fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, completed: false })
        })
        .then(response => response.json())
        .then(newTodo => {
            addTodoToDOM(newTodo);
            todoForm.reset();
        });
    });

    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${todo.title}</strong>
            <p>${todo.description}</p>
            <button onclick="deleteTodo('${todo._id}')">Delete</button>
        `;
        todoList.appendChild(li);
    }

    window.deleteTodo = function(id) {
        fetch(`/todos/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            window.location.reload();
        });
    };
});