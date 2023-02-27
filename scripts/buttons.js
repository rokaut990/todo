const getLocalStorageData = localStorage.getItem('taskList');
const listArray = JSON.parse(getLocalStorageData);

  
export function markImportant(index) {  
  !listArray[index]._important ? listArray[index]._important = true : listArray[index]._important = false;
  
  document.querySelector(`#listItem${index}`).classList.toggle('important');
  document.querySelector(`#listItem${index} .importantButton`).classList.toggle('notImportantButton');
  localStorage.setItem('taskList', JSON.stringify(listArray));
}


export function markDone(index) {
  !listArray[index]._done ? listArray[index]._done = true : listArray[index]._done = false;
  
  //document.querySelector(`#listItem${index}`).classList.toggle('doneItem');
  document.querySelector(`#listItem${index} span`).classList.toggle('doneText');
  document.querySelector(`#listItem${index} .doneButton`).classList.toggle('undoneButton');
  localStorage.setItem('taskList', JSON.stringify(listArray)); 
}


export function deleteTask(index) {
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem('taskList', JSON.stringify(listArray));
}