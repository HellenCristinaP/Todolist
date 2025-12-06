const inputTask = document.getElementById("taskInput");
const btnSubmit = document.getElementById("submit");
const taskList = document.getElementById("taskList");

btnSubmit.addEventListener("click", function(e) {
  validacao(e);
});


function validacao(e) {
  e.preventDefault();

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
  listItem.ariaLabel = `Tarefa: ${task}, pendente`;
  listItem.ariaDescription = "Clique para mudar o estado da tarefa";
  div.appendChild(listItem);
  
  const logicaDoEstado = (listItem) => {
    if (listItem.classList.contains("progress")) {
      listItem.classList.remove("progress");
      listItem.classList.add("completed");
      listItem.ariaLabel = `Tarefa: ${task}, concluída`;
    } else if (listItem.classList.contains("completed")) {
      listItem.classList.remove("completed");
      listItem.ariaLabel = `Tarefa: ${task}, pendente`;
    } else {
      listItem.classList.add("progress");
      listItem.ariaLabel = `Tarefa: ${task}, em andamento`;
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

  addExcluir(div, excluir, task);
}

function addExcluir(div, excluir, task) {
  const logicaExcluir = (excluir) => {
    confirm("Deseja realmente excluir esta tarefa?") && taskList.removeChild(div);
  };

  excluir.className = "delete-button";
  excluir.ariaLabel = `Excluir a tarefa: ${task}`;
  div.appendChild(excluir);

  excluir.addEventListener("click", function () {
    logicaExcluir(excluir);
  });

  excluir.addEventListener("keydown", function (event) {
    if (event.key === "Enter"){
      logicaExcluir(excluir);
    }
  });
}
