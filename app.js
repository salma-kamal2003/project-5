//#region Initial Data Source
let todosList = [
    { title: "Play Tennis", statusCode: "1" },
    { title: "Deliver JS Assignment", statusCode: "1" },
    { title: "Learn New Techs", statusCode: "1" },
];
  //#endregion

  //#region Create Todo List Item
const createTodoLI = (todo) => `<li
class="list-group-item d-flex justify-content-between align-items-center"
>
<div class="col-md-5">
  <span class="todoName">${todo.title}</span>
</div>

<div class="col-md-7 d-flex justify-content-start">
      <span class="badge bg-danger currentStatus mx-1">${getStatus(todo.statusCode).status
}</span>
      <select class="form-control statusSelect mx-1">
        <option value="0" selected disabled>Status</option>
        <option value="2">In progress</option>
        <option value="3">Done</option>
      </select>
      <i class="far fa-trash-alt delete py-2 mx-1"></i>
</div>
</li>`;
  //#endregion

  //#region Bind Todos To Dom
  // دي بتستقبل ليستة و بتعيد رسمها في الصفحة
const BindTodosToDom = (todos) => {
    todosUL.innerHTML = todos.map(createTodoLI).join("");
};

const BindSingleTodo = (todo) => {
    todosUL.innerHTML += createTodoLI(todo);
};
  //#endregion

  //#region Search Todos
const searchTodos = (todoSearchText, list) => {
    let FilteredTodos = list.filter((todo) =>
    todo.title.toLowerCase().includes(todoSearchText.toLowerCase())
    );
    BindTodosToDom(FilteredTodos);
};
  //#endregion

  //#region Evaluate Status
    const getStatus = (statusCode) =>
    statusCode === "1"
    ? { status: "Not started", color: "bg-danger" }
    : statusCode === "2"
    ? { status: "In progress", color: "bg-primary" }
    : { status: "Done", color: "bg-success" };
  //#endregion

  //#region Generate Options
const generateOptions = (selectedStatusCode) =>
    selectedStatusCode === "1"
    ? `<option value="0" selected disabled>Status</option>
                    <option value="2">In progress</option>
                    <option value="3">Done</option>`
    : selectedStatusCode === "2"
    ? `<option value="0" selected disabled>Status</option>
                    <option value="1">To do</option>
                    <option value="3">Done</option>`
    : `<option value="0" selected disabled>Status</option>
                    <option value="1">To do</option>
                    <option value="2">In progress</option>`;
  //#endregion

  //#region Functions Calls
    BindTodosToDom(todosList);
  //#endregion

  //#region Events Handlers
    window.addEventListener("DOMContentLoaded", () => {
    const todosUL = document.getElementById("todosUL");
    const searchForm = document.getElementById("searchForm");
    const searchText = document.getElementById("searchText");
    const addForm = document.getElementById("addForm");
    const addText = document.getElementById("addText");
    if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let searchedText = searchText.value;
        searchTodos(searchedText, todosList);
    });
    }
    if (addForm) {
    addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let addedText = addText.value;
        let newTodo = { title: addedText, statusCode: 1 };
        if (addedText.trim().length > 0) {
        todosList.push(newTodo);
        BindSingleTodo(newTodo);
        }
        addText.value = "";
    });
    }
    if (todosUL) {
    todosUL.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
        let todoToBeDeleted = e.target
            .closest("li")
            .getElementsByTagName("span")[0].innerHTML;
        e.target.closest("li").remove();
        let indexToBeDeleted = todosList.findIndex(
            (todo) => todo.title === todoToBeDeleted
        );
        todosList.splice(indexToBeDeleted, 1);
        }
    });

    todosUL.addEventListener("change", (e) => {
        if (e.target.classList.contains("statusSelect")) {
        let selectedStatus = e.target.value;
        e.target.innerHTML = generateOptions(selectedStatus);
        let newStatus = getStatus(selectedStatus);
        e.target.previousElementSibling.innerHTML = newStatus.status;
        e.target.previousElementSibling.className = `badge currentStatus mx-1 ${newStatus.color}`;
        }
    });
    }
});
  //#endregion
