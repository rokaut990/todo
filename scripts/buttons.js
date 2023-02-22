// delete task function
export function deleteTask(index) {
    const getLocalStorageData = localStorage.getItem('New Todo 2');
    const listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); //delete or remove the li
    localStorage.setItem('New Todo 2', JSON.stringify(listArray));
  }
  
  // mark important function
  
  export function markImportant(index) {
    const getLocalStorageData = localStorage.getItem('New Todo 2');
    const listArray = JSON.parse(getLocalStorageData);
    if(!listArray[index].important) {
      listArray[index].important = true;
      localStorage.setItem('New Todo 2', JSON.stringify(listArray));
      document.querySelector(`#listItem${index}`).classList.toggle('important');
      document.querySelector(`#listItem${index} .importantButton`).classList.toggle('notImportantButton');
    }
    else {
      console.log('already in the list');
      listArray[index].important = false;
      localStorage.setItem('New Todo 2', JSON.stringify(listArray));
      document.querySelector(`#listItem${index}`).classList.toggle('important');
      document.querySelector(`#listItem${index} .importantButton`).classList.toggle('notImportantButton');
    }
  }
  
  
  // mark done function
  
  
  export function markDone(index) {
    const getLocalStorageData = localStorage.getItem('New Todo 2'); //getting localstorage
    const listArray = JSON.parse(getLocalStorageData);
  
    if(!listArray[index].done){
      listArray[index].done = true;
      localStorage.setItem('New Todo 2', JSON.stringify(listArray)); 
      document.querySelector(`#listItem${index} span`).classList.toggle('done');
      document.querySelector(`#listItem${index} .doneButton`).classList.toggle('undoneButton');
    }
    else {
      console.log('already in the list');
      listArray[index].done = false;
      localStorage.setItem('New Todo 2', JSON.stringify(listArray));
      document.querySelector(`#listItem${index} span`).classList.toggle('done');
      document.querySelector(`#listItem${index} .doneButton`).classList.toggle('undoneButton');
    }
  }