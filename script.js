const apikey = '8e48a258-37a7-4754-af8f-fbfdbd6f708d';
const apihost = 'https://todo-api.coderslab.pl';

function apiListTasks() {
  return fetch(apihost + "/api/tasks", { headers: { Authorization: apikey } }).then(function (resp) {
    if (!resp.ok) {
      alert("Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny");
    }
    return resp.json();
  });
}

function apiListOperationsForTask(taskId) {
  return fetch(apihost + "/api/tasks/" + taskId + "/operations", { headers: { Authorization: apikey } }).then(
    function (resp) {
      return resp.json();
    },
  );
}

function renderTask(taskId, title, description, status) {
  const section = document.createElement("section");
  section.className = "card mt-5 shadow-sm";
  document.querySelector("main").appendChild(section);

  const headerDiv = document.createElement("div");
  headerDiv.className = "card-header d-flex justify-content-between align-items-center";
  section.appendChild(headerDiv);

  const headerLeftDiv = document.createElement("div");
  headerDiv.appendChild(headerLeftDiv);

  const h5 = document.createElement("h5");
  h5.innerText = title;
  headerLeftDiv.appendChild(h5);

  const h6 = document.createElement("h6");
  h6.className = "card-subtitle text-muted";
  h6.innerText = description;
  headerLeftDiv.appendChild(h6);

  const headerRightDiv = document.createElement("div");
  headerDiv.appendChild(headerRightDiv);
}

function renderOperation(ul, status, operationId, operationDescription, timeSpent) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  ul.appendChild(li);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.innerText = operationDescription;
  li.appendChild(descriptionDiv);
}




document.addEventListener("DOMContentLoaded", function () {
  apiListTasks().then(function (response) {
    response.data.forEach(function (task) {
      renderTask(task.id, task.title, task.description, task.status);
    });
  });
});
