import { x, listItem } from './class.js'
console.log(x);
import {markImportant, markDone, deleteTask} from './buttons.js'


const addBtn = document.querySelector('.newTask button');
const inputBox = document.querySelector('.newTask textarea');
const textarea = document.getElementById('newTaskInput');
const todoList = document.querySelector('.todoList');


// tasks 

addBtn.addEventListener('click', addTask);
function addTask() { 
  const userEnteredValue = inputBox.value; //getting input field value
  const getLocalStorageData = localStorage.getItem('New Todo 2'); //getting localstorage
  let listArray = [];
  if(!!getLocalStorageData) {
    listArray = JSON.parse(getLocalStorageData);
  }
  if(userEnteredValue.trim() != ''){
    let newItem = new listItem(userEnteredValue);
    listArray.push(newItem); //pushing new object in array
    localStorage.setItem('New Todo 2', JSON.stringify(listArray)); //transforming js object into a json string
    showTasks(); //calling showTask function
    addBtn.classList.remove('active'); //unactive the add button once the task added
  }
}

textarea.addEventListener('keypress', handleKeyPress);
function handleKeyPress(e) {
 var key=e.keyCode || e.which;
  if (key === 13){ // Клавиша Enter
    addBtn.click();
  }
}

export function showTasks(){
  const getLocalStorageData = localStorage.getItem('New Todo 2');
  let listArray = [];
  let id = 0;
  if(!!getLocalStorageData) {
    listArray = JSON.parse(getLocalStorageData); 
  }
  while(todoList.firstChild) {
    todoList.firstChild.remove();
  }
  listArray.forEach((element, index) => {
    makeListItem(element, id);
    id++;
  });
  localStorage.setItem('New Todo 2', JSON.stringify(listArray)); //transforming js object into a json string
  inputBox.value = ''; //once task added leave the input field blank
  localStorage.getItem('New Todo 2') ? init() : null;
}

function makeListItem(element, id) {
  let newLiTagNew = document.createElement('li');
  let textEl = document.createElement('span');
  let importantButton = document.createElement('button');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');
  element.id = id;
  console.log(element.id);

  newLiTagNew.setAttribute('id', `listItem${id}`);
  textEl.textContent = element.value;
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

  importantButton.addEventListener('click', () => markImportant(element.id));
  doneButton.addEventListener('click', () => markDone(element.id));
  deleteButton.addEventListener('click', () => {deleteTask(element.id); showTasks()});
}

function init() {
  const getLocalStorageData = localStorage.getItem('New Todo 2');
  const listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
    listArray[index].important ? document.querySelector(`#listItem${index}`).classList.add('important') : null;
    listArray[index].important ? document.querySelector(`#listItem${index} .importantButton`).classList.add('notImportantButton'): null;
    listArray[index].done ? document.querySelector(`#listItem${index} span`).classList.add('done') : null;
    listArray[index].done ? document.querySelector(`#listItem${index} .doneButton`).classList.add('undoneButton') : null;
  });
}

