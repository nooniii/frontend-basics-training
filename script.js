const form = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const prioritySelect = document.getElementById('priority-select');
const todoList = document.getElementById('todo-list');
const sortBtn = document.getElementById('sort-btn');

function createTodoItem(text, completed = false, priority = 'medium') {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.priority = priority;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = completed;
    checkbox.onchange = () => {
        span.classList.toggle('completed');
    };

    const priorityBadge = document.createElement('span');
    priorityBadge.className = `priority-badge priority-${priority}`;
    priorityBadge.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);

    const span = document.createElement('span');
    span.className = 'todo-text' + (completed ? ' completed' : '');
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.onclick = () => {
        todoList.removeChild(li);
    };

    li.appendChild(checkbox);
    li.appendChild(priorityBadge);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
}

function sortTasksByPriority() {
    const items = Array.from(todoList.children);
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    
    items.sort((a, b) => {
        const priorityA = priorityOrder[a.dataset.priority] || 2;
        const priorityB = priorityOrder[b.dataset.priority] || 2;
        return priorityA - priorityB;
    });
    
    items.forEach(item => todoList.appendChild(item));
}

form.onsubmit = function(e) {
    e.preventDefault();
    const text = todoInput.value.trim();
    const priority = prioritySelect.value;
    if (text) {
        const todoItem = createTodoItem(text, false, priority);
        todoList.appendChild(todoItem);
        todoInput.value = '';
        todoInput.focus();
    }
};

sortBtn.onclick = sortTasksByPriority;