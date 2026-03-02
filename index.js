// fetch entered todo from input

const newTodo = document.getElementById('new-todo-input');
const addBtn = document.getElementById('add-todo-btn');
const deleteBtn = document.querySelector('.todo-delete');
const todoListContainer = document.getElementById('todo-list');

addBtn.addEventListener('click', () => {
    if(newTodo.value.trim()==='') return;
    // create a new todo item
    createTodoItem(newTodo.value);
});

todoListContainer.addEventListener('click', (e) => {

    const parentElement = e.target.parentElement;
    // for delete button
    if(e.target.classList.contains('todo-delete')){
        parentElement.remove();
    }
    // for checkbox click
    if(e.target.classList.contains('todo-checkbox')){
        parentElement.classList.toggle('done');
        e.target.classList.toggle('checked');
    }
     
});


 
function createTodoItem(todoText){
     const todoItemLi = document.createElement('li');
     const todoIndex = todoListContainer.children.length+1
     todoItemLi.setAttribute('data-id',todoIndex);
     todoItemLi.classList.add('todo-item');

     todoItemLi.innerHTML =`<input type="checkbox" class="todo-checkbox" id="todo-${todoIndex}" />
        <label for="todo-${todoIndex}" class="todo-label">${todoText}</label>
        <button type="button" class="todo-delete" aria-label="Delete todo">×</button>`;

        todoListContainer.appendChild(todoItemLi);
        newTodo.value='';

}