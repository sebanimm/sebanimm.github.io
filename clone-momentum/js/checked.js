const createdToDo = document.querySelector("#todo-list li span");

function checkToDo() {
  createdToDo.classList.toggle("checked");
}

createdToDo.addEventListener("click", checkToDo);
