const searchInput = document.getElementById('search');
const allTasksButton = document.getElementById('All').nextElementSibling;
const importantTasksButton = document.getElementById('Important').nextElementSibling;
const activeTasksButton = document.getElementById('Active').nextElementSibling;
const doneTasksButton = document.getElementById('Done').nextElementSibling;
const getLocalStorageData = localStorage.getItem('New Todo 2');
const listArray = JSON.parse(getLocalStorageData);

// search 
searchInput.addEventListener('input', searchTask);
export function searchTask() {
  listArray.forEach((element, index) => {
    listArray[index]._value.includes(searchInput.value) ? console.log('contains') : console.log('no');
    listArray[index]._value.includes(searchInput.value) ? document.querySelector(`#listItem${index}`).classList.remove('invisible') :
    document.querySelector(`#listItem${index}`).classList.add('invisible');
  });
}

// navigation

allTasksButton.addEventListener('click', showAllTasks);
export function showAllTasks(e) {
  listArray.forEach((element, index) => {
  document.querySelector(`#listItem${index}`).classList.remove('invisible');
  });
  console.log(e);
}

importantTasksButton.addEventListener('click', showImportantTasks);
export function showImportantTasks() {
  listArray.forEach((element, index) => {
    !listArray[index]._important ? document.querySelector(`#listItem${index}`).classList.add('invisible') :
    document.querySelector(`#listItem${index}`).classList.remove('invisible');
  });
}

activeTasksButton.addEventListener('click', showActiveTasks); 
export function showActiveTasks() {
  listArray.forEach((element, index) => {
    !listArray[index]._done ? document.querySelector(`#listItem${index}`).classList.remove('invisible') : 
    document.querySelector(`#listItem${index}`).classList.add('invisible');
  });
}

doneTasksButton.addEventListener('click', showDoneTasks);
export function showDoneTasks() {
  listArray.forEach((element, index) => {
    !listArray[index]._done ? document.querySelector(`#listItem${index}`).classList.add('invisible') : 
    document.querySelector(`#listItem${index}`).classList.remove('invisible');
  });
}
