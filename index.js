// fetch entered todo from input

const newTodo = document.getElementById("new-todo-input");
const addBtn = document.getElementById("add-todo-btn");
const deleteBtn = document.querySelector(".todo-delete");
const todoListContainer = document.getElementById("todo-list");

let todosList = JSON.parse(localStorage.getItem("TodoTask")) || [];

if (todosList !== undefined && todosList !== null) {
  for (let i = 0; i < todosList.length; i++) {
    createTodoItem(todosList[i]);
  }
}

addBtn.addEventListener("click", () => {
  const todoIndex = todoListContainer.children.length + 1;
  if (newTodo.value.trim() === "") return;
  // create a new todo item
  todosList.push({ id: todoIndex, text: newTodo.value, active: true });

  // store new todo in local storage
  localStorage.setItem("TodoTask", JSON.stringify(todosList));

  todoListContainer.innerHTML = "";
  for (let i = 0; i < todosList.length; i++) {
    createTodoItem(todosList[i]);
  }
  // empty todo input field
  newTodo.value = "";
});

todoListContainer.addEventListener("click", (e) => {
  const parentElement = e.target.parentElement;
  let updatedTodo = todosList;

  // for delete button
  if (e.target.classList.contains("todo-delete")) {
    parentElement.remove();

    updatedTodo = updatedTodo.filter(
      (item) => item.id != parentElement.dataset.id
    );
  }

  // for checkbox click
  if (e.target.classList.contains("todo-checkbox")) {
    parentElement.classList.toggle("done");
    e.target.classList.toggle("checked");

    updatedTodo = updatedTodo.map((item) => {
      if (item.id === Number(parentElement.dataset.id))
        item.active = !e.target.checked;

      return item;
    });
  }

  localStorage.setItem("TodoTask", JSON.stringify(updatedTodo));
  todosList = updatedTodo;
});

function createTodoItem(todoItem) {
  const todoItemLi = document.createElement("li");
  todoItemLi.setAttribute("data-id", todoItem.id);
  todoItemLi.classList.add("todo-item");
  if (todoItem.active === true) {
    todoItemLi.innerHTML = `<input type="checkbox" class="todo-checkbox" id="todo-${todoItem.id}" />`;
  } else {
    todoItemLi.classList.add("done");
    todoItemLi.innerHTML = `<input type="checkbox" class="todo-checkbox" id="todo-${todoItem.id}" checked/>`;
  }

  todoItemLi.innerHTML += `
        <label for="todo-${todoItem.id}" class="todo-label">${todoItem.text}</label>
        <button type="button" class="todo-delete"  aria-label="Delete todo">×</button>`;

  todoListContainer.appendChild(todoItemLi);
}
