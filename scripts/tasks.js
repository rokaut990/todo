import {listItem } from './class.js'
import {markImportant, markDone, deleteTask} from './buttons.js'


const addBtn = document.querySelector('.newTask button');
const inputBox = document.querySelector('.newTask textarea');
const textarea = document.getElementById('newTaskInput');
const todoList = document.querySelector('.todoList');

const getLocalStorageData = localStorage.getItem('taskList');
let listArray = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];
  

addBtn.addEventListener('click', addTask);
function addTask() { 
  //getting input field value
  const userEnteredValue = inputBox.value; 
  if(!!userEnteredValue.trim()) {
    const newItem = new listItem(userEnteredValue);
    //pushing new object in array
    listArray.push(newItem); 
    //transforming js object into a json string
    localStorage.setItem('taskList', JSON.stringify(listArray)); 
     //calling showTask function
    showTasks();
    //unactive the add button once the task added
    addBtn.classList.remove('active'); 
  }
}

textarea.addEventListener('keypress', handleKeyPress);
function handleKeyPress(e) {
 var key=e.keyCode || e.which;
  if (key === 13 && !!inputBox.value.trim()) {
    addBtn.click();
  }
}

export function showTasks(e) {
  const getLocalStorageData = localStorage.getItem('taskList');
  let listArray = getLocalStorageData ? JSON.parse(getLocalStorageData) : []; 
  let idCounter = 0;
  
  while(todoList.firstChild) {
    todoList.firstChild.remove();
  }
  listArray.forEach((element, index) => {
    makeListItem(element, idCounter++);
  });
  localStorage.setItem('taskList', JSON.stringify(listArray));
   //once task added leave the input field blank
  inputBox.value = '';
  // adding styles to built items
  localStorage.getItem('taskList') ? init() : null;
}

function makeListItem(element, id) {
  const newLiTagNew = document.createElement('li');
  const textEl = document.createElement('span');
  const importantButton = document.createElement('button');
  const doneButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  element._id = id;

  newLiTagNew.setAttribute('id', `listItem${element._id}`);
  textEl.textContent = element._value;
  doneButton.setAttribute('type', 'button');
  importantButton.setAttribute('type', 'button');
  deleteButton.setAttribute('type', 'button');

  newLiTagNew.classList.add('listItem');
  textEl.classList.add('itemText');
  importantButton.classList.add('importantButton');
  doneButton.classList.add('doneButton');
  deleteButton.classList.add('deleteButton');
  
  //todoList.insertAdjacentElement('afterbegin' , newLiTagNew);
  todoList.prepend(newLiTagNew);
  newLiTagNew.append(textEl);
  newLiTagNew.append(importantButton);
  newLiTagNew.append(doneButton);
  newLiTagNew.append(deleteButton);

  importantButton.addEventListener('click', () => markImportant(element._id));
  //newLiTagNew.addEventListener('click', (e) => markDone(element.id));
  doneButton.addEventListener('click', (e) => markDone(element._id));
  deleteButton.addEventListener('click', (e) => { deleteTask(element._id); showTasks()});

  // newLiTagNew.addEventListener('click', (e) => {if (e.target.classList.contains('importantButton')) markImportant(element.id);});
  // newLiTagNew.addEventListener('click', (e) => {if (e.target.classList.contains('doneButton')) markDone(element.id);});
  //newLiTagNew.addEventListener('click', (e) => {if (e.target.classList.contains('deleteButton')) deleteTask(element.id); showTasks();});
}

function init() {
  const getLocalStorageData = localStorage.getItem('taskList');
  let listArray = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];
  listArray.forEach((element, index) => {
    if (listArray[index]._important) {
      document.querySelector(`#listItem${index}`).classList.add('important');
      document.querySelector(`#listItem${index} .importantButton`).classList.add('notImportantButton');
    }
    if(listArray[index]._done) {
      document.querySelector(`#listItem${index} span`).classList.add('doneText');
      document.querySelector(`#listItem${index} .doneButton`).classList.add('undoneButton');
    }
  });
}