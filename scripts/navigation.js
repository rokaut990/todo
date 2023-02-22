const searchInput = document.getElementById('search');
const All = document.getElementById('All');
const Important = document.getElementById('Important');
const Active = document.getElementById('Active');
const Done = document.getElementById('Done');


// search 
searchInput.addEventListener('input', searchTask);
export function searchTask() {
  const getLocalStorageData = localStorage.getItem('New Todo 2');
  const listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
    listArray[index].value.includes(searchInput.value) ? console.log('contains') : console.log('no');
    listArray[index].value.includes(searchInput.value) ? document.querySelector(`#listItem${index}`).classList.remove('invisible') :
    document.querySelector(`#listItem${index}`).classList.add('invisible');
  });
}

// navigation

All.addEventListener('click', showAllTasks);
export function showAllTasks() {
  const getLocalStorageData = localStorage.getItem('New Todo 2');
  const listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
  document.querySelector(`#listItem${index}`).classList.remove('invisible');
  });
}

Important.addEventListener('click', showImportantTasks);
export function showImportantTasks() {
  const getLocalStorageData = localStorage.getItem('New Todo 2');
  const listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
    !listArray[index].important ? document.querySelector(`#listItem${index}`).classList.add('invisible') :
    document.querySelector(`#listItem${index}`).classList.remove('invisible');
  });
}

Active.addEventListener('click', showActiveTasks); 
export function showActiveTasks() {
  const getLocalStorageData = localStorage.getItem('New Todo 2');
  const listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
    !listArray[index].done ? document.querySelector(`#listItem${index}`).classList.remove('invisible') : 
    document.querySelector(`#listItem${index}`).classList.add('invisible');
  });
}

Done.addEventListener('click', showDoneTasks);
export function showDoneTasks() {
  const getLocalStorageData = localStorage.getItem('New Todo 2');
  const listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
    !listArray[index].done ? document.querySelector(`#listItem${index}`).classList.add('invisible') : 
    document.querySelector(`#listItem${index}`).classList.remove('invisible');
  });
}
