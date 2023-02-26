import { x, listItem } from './class.js'
console.log(`x: ${x}`);
import {markImportant, markDone, deleteTask} from './buttons.js'


const addBtn = document.querySelector('.newTask button');
const inputBox = document.querySelector('.newTask textarea');
const textarea = document.getElementById('newTaskInput');
const todoList = document.querySelector('.todoList');

const getLocalStorageData = localStorage.getItem('New Todo 2');
let listArray = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];
  

// tasks 

addBtn.addEventListener('click', addTask);
function addTask() { 
  const userEnteredValue = inputBox.value; //getting input field value
  if(!!userEnteredValue.trim()){
    const newItem = new listItem(userEnteredValue);
    listArray.push(newItem); //pushing new object in array
    localStorage.setItem('New Todo 2', JSON.stringify(listArray)); //transforming js object into a json string
    showTasks(); //calling showTask function
    addBtn.classList.remove('active'); //unactive the add button once the task added
  }
}

textarea.addEventListener('keypress', handleKeyPress);
function handleKeyPress(e) {
 var key=e.keyCode || e.which;
  if (key === 13 && !!inputBox.value.trim()){ // Клавиша Enter
    addBtn.click();
  }
}

export function showTasks(e){
  const getLocalStorageData = localStorage.getItem('New Todo 2');
  let listArray = [];
  let idCounter = listArray.length;
  listArray = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];
  while(todoList.firstChild) {
    todoList.firstChild.remove();
  }
  listArray.forEach((element) => {
    makeListItem(element, idCounter++);
  });
  localStorage.setItem('New Todo 2', JSON.stringify(listArray)); //transforming js object into a json string
  inputBox.value = ''; //once task added leave the input field blank
  localStorage.getItem('New Todo 2') ? init() : null;
}

function makeListItem(element, id) {
  const newLiTagNew = document.createElement('li');
  const textEl = document.createElement('span');
  const importantButton = document.createElement('button');
  const doneButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  element.id = id;

  newLiTagNew.setAttribute('id', `listItem${element.id}`);
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

  importantButton.addEventListener('click', () => markImportant(element.id));
  //newLiTagNew.addEventListener('click', (e) => markDone(element.id));
  doneButton.addEventListener('click', (e) => markDone(element.id));
  deleteButton.addEventListener('click', (e) => { deleteTask(element.id); showTasks()});

  // newLiTagNew.addEventListener('click', (e) => {if (e.target.classList.contains('importantButton')) markImportant(element.id);});
  // newLiTagNew.addEventListener('click', (e) => {if (e.target.classList.contains('doneButton')) markDone(element.id);});
  // newLiTagNew.addEventListener('click', (e) => {if (e.target.classList.contains('deleteButton')) deleteTask(element.id); showTasks();});
}

function init() {
  listArray.forEach((element, index) => {
    listArray[index]._important ? document.querySelector(`#listItem${index}`).classList.add('important') : null;
    listArray[index]._important ? document.querySelector(`#listItem${index} .importantButton`).classList.add('notImportantButton'): null;
    listArray[index]._done ? document.querySelector(`#listItem${index} span`).classList.add('done') : null;
    //listArray[index]._done ? document.querySelector(`#listItem${index} .doneButton`).classList.add('undoneButton') : null;
  });
}