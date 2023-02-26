const getLocalStorageData = localStorage.getItem('New Todo 2');
const listArray = JSON.parse(getLocalStorageData);

// mark important function
  
export function markImportant(index) {  
  if(!listArray[index]._important) {
    listArray[index]._important = true;
    localStorage.setItem('New Todo 2', JSON.stringify(listArray));
    document.querySelector(`#listItem${index}`).classList.toggle('important');
    document.querySelector(`#listItem${index} .importantButton`).classList.toggle('notImportantButton');
  }
  else {
    console.log('already in the list');
    listArray[index]._important = false;
    localStorage.setItem('New Todo 2', JSON.stringify(listArray));
    document.querySelector(`#listItem${index}`).classList.toggle('important');
    document.querySelector(`#listItem${index} .importantButton`).classList.toggle('notImportantButton');
  }
}
  
  
  // mark done function
  
export function markDone(index) {
  
  if(!listArray[index]._done){
    listArray[index]._done = true;
    localStorage.setItem('New Todo 2', JSON.stringify(listArray)); 
    //document.querySelector(`#listItem${index}`).classList.toggle('doneItem');
    document.querySelector(`#listItem${index} span`).classList.toggle('doneText');
    document.querySelector(`#listItem${index} .doneButton`).classList.toggle('undoneButton');
  }
  else {
    console.log('already in the list');
    listArray[index]._done = false;
    localStorage.setItem('New Todo 2', JSON.stringify(listArray));
    //document.querySelector(`#listItem${index}`).classList.toggle('doneItem');
    document.querySelector(`#listItem${index} span`).classList.toggle('doneText');
    document.querySelector(`#listItem${index} .doneButton`).classList.toggle('undoneButton');
  }
}


// delete task function

export function deleteTask(index) {
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem('New Todo 2', JSON.stringify(listArray));
}