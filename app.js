/**
 * Retrieves tasks from storage and parses them for display.
 *
 * @format
 */
function checkUI() {
  const tasks = retrieveTasks();
  tasks.forEach((task) => addTaskToDOM(task));
}

/**
 * Returns an array of tasks from storage.
 *
 * @returns {object} - Returns an array of tasks from storage.
 */
function retrieveTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return tasks;
}

/**
 * Checks to ensure there is a valid input.
 */
function checkInput() {
  const taskInput = document.querySelector("#task-input");
  if (taskInput.value === "") {
    alert("No tasks added");
    return;
  }
  addTask(taskInput);
}

/**
 * Creates and adds a new task to the DOM and to storage.
 *
 * @returns {undefined} - Returns undefined if no input is provided
 */
function addTask(task) {
  addTaskToStorage(task.value);
  addTaskToDOM(task.value);
  task.value = "";
}

/**
 * Appends a new task to the DOM task list.
 *
 * @param {string} - A string representing a new task.
 */
function addTaskToDOM(task) {
  const checkbox = createCheckbox();
  const span = createSpan(task);
  const icon = createIcon();

  const li = createLI(checkbox, span, icon);
  document.querySelector("#task-items").appendChild(li);
}

/**
 * Adds a task to local storage.
 *
 * @param {string} task - A string representing a task.
 */
function addTaskToStorage(task) {
  let tasks = retrieveTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Deletes selected task.
 *
 * @param {Event} e - The event parameter
 */
function deleteTask(e) {
  if (e.target.classList.contains("fa-solid")) {
    deleteTaskFromDOM(e.target.parentElement);
    deleteTaskFromStorage(e.target.previousSibling.textContent);
  }
}

/**
 * Deletes all tasks from storage.
 *
 * @param {Event} e - The event parameter.
 */
function deleteAllTasks(e) {
  if (!confirm("Are you sure?")) {
    return;
  }
  if ((e.target.id = "delete-tasks-button")) {
    const taskItems = document.querySelector("#task-items");
    while (taskItems.firstChild) {
      taskItems.removeChild(taskItems.firstChild);
    }
    const tasks = retrieveTasks();
    tasks.forEach((task) => {
      deleteTaskFromStorage(task);
    });
  }
}

/**
 * Deletes a single task from the DOM.
 *
 * @param {Element} task - A list element
 */
function deleteTaskFromDOM(task) {
  task.remove();
}

/**
 * Deletes a selected task from storage.
 *
 * @param {string} task - A string representing a task
 */
function deleteTaskFromStorage(task) {
  let tasks = retrieveTasks();
  tasks = tasks.filter((i) => i !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Creates and returns a new input element.
 *
 * @returns {Element} - Returns an input element.
 */
function createCheckbox() {
  const input = document.createElement("input");
  input.type = "checkbox";
  input.name = "checkbox";
  input.addEventListener("click", strikethrough);

  return input;
}

/**
 * Returns a span with the new task.
 *
 * @param {string} task - A string representing a task
 * @returns {Element} - Returns a span element
 */
function createSpan(task) {
  const span = document.createElement("span");
  span.textContent = task;
  return span;
}

/**
 * Creates and returns a new icon element.
 *
 * @returns {Element} - Returns a new icon element
 */
function createIcon() {
  const icon = document.createElement("i");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-circle-minus");
  return icon;
}

/**
 * Creates and returns a li element.
 *
 * @param {Element} input - An input element
 * @param {Element} task - A textNode element
 * @param {Element} icon - An icon element
 * @returns {Element} - Returns a li element
 */
function createLI(checkbox, task, icon) {
  const li = document.createElement("li");
  li.appendChild(checkbox);
  li.appendChild(task);
  li.appendChild(icon);
  return li;
}

/**
 * Toggles strikethrough decoration when checkbox is clicked.
 *
 * @param {Event} e - The event parameter
 */
function strikethrough(e) {
  e.target.nextSibling.classList.toggle("strikethrough");
}

/**
 * Starts the app and adds event listeners.
 */
function startApp() {
  document
    .querySelector("#add-task-button")
    .addEventListener("click", checkInput);
  document.querySelector("#task-items").addEventListener("click", deleteTask);
  document
    .querySelector("#delete-tasks-button")
    .addEventListener("click", deleteAllTasks);
  checkUI();
}

startApp();
