const inputTask = document.getElementById("taskInput");
const btnSubmit = document.getElementById("submit");
const taskList = document.getElementById("taskList");

btnSubmit.addEventListener("click", validacao);

function validacao() {
  const task = inputTask.value;

  if (task === "") {
    alert("Por favor, digite uma tarefa.");
  } else if (task.length < 3) {
    alert("A tarefa deve ter no mínimo 3 caracteres.");
  } else if (task.length > 100) {
    alert("A tarefa deve ter no máximo 100 caracteres.");
  } else {
    adicionarTarefa(task);
  }
  inputTask.value = "";
}

function adicionarTarefa(task) {
  const listItem = document.createElement("li");
  const excluir = document.createElement("button");
  const div = document.createElement("div");

  div.className = "task-container";
  taskList.appendChild(div);

  listItem.className = "task-item";
  listItem.textContent = task;
  listItem.tabIndex = 0;
  div.appendChild(listItem);

  addExcluir(div, excluir);

  const logicaDoEstado = (listItem) => {
    if (listItem.classList.contains("progress")) {
      listItem.classList.remove("progress");
      listItem.classList.add("completed");
    } else if (listItem.classList.contains("completed")) {
      listItem.classList.remove("completed");
    } else {
      listItem.classList.add("progress");
    }
  };

  listItem.addEventListener("click", function () {
    logicaDoEstado(listItem);
  });

  listItem.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      logicaDoEstado(listItem);
    }
  });
}

function addExcluir(div, excluir) {
  const logicaExcluir = (excluir) => {
    confirm("Deseja realmente excluir esta tarefa?") && taskList.removeChild(div);
  };

  excluir.className = "delete-button";
  excluir.ariaLabel = "Excluir tarefa";
  div.appendChild(excluir);

  excluir.addEventListener("click", function (event) {
    logicaExcluir(excluir);
  });

  excluir.addEventListener("keydown", function (event) {
    logicaExcluir(excluir);
  });
}
