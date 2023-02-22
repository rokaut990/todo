'use strict'

import { x, listItem } from './class.js'
console.log(x);

const searchInput = document.getElementById('search');
const inputBox = document.querySelector('.newTask textarea');
const addBtn = document.querySelector('.newTask button');
const textarea = document.getElementById('newTaskInput');
const todoList = document.querySelector('.todoList');
const All = document.getElementById('All');
const Important = document.getElementById('Important');
const Active = document.getElementById('Active');
const Done = document.getElementById('Done');

showTasks(); //calling showTask function

// search 
searchInput.addEventListener('input', searchTask);
function searchTask() {
  const getLocalStorageData = localStorage.getItem('New Todo 2');
  const listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
    listArray[index].value.includes(searchInput.value) ? console.log('contains') : console.log('no');
    listArray[index].value.includes(searchInput.value) ? document.querySelector(`#listItem${index}`).classList.remove('invisible') :
    document.querySelector(`#listItem${index}`).classList.add('invisible');
  });
}
//

// navigation
All.addEventListener('click', showAllTasks);
function showAllTasks() {
  const getLocalStorageData = localStorage.getItem('New Todo 2');
  const listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
  document.querySelector(`#listItem${index}`).classList.remove('invisible');
  });
}

// showAllTasks.onclick = (event) =>{
// console.log(event)
// }

Important.addEventListener('click', showImportantTasks);
function showImportantTasks() {
  const getLocalStorageData = localStorage.getItem('New Todo 2');
  const listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
    !listArray[index].important ? document.querySelector(`#listItem${index}`).classList.add('invisible') :
    document.querySelector(`#listItem${index}`).classList.remove('invisible');
  });
}

Active.addEventListener('click', showActiveTasks); 
function showActiveTasks() {
  const getLocalStorageData = localStorage.getItem('New Todo 2');
  const listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
    !listArray[index].done ? document.querySelector(`#listItem${index}`).classList.remove('invisible') : 
    document.querySelector(`#listItem${index}`).classList.add('invisible');
  });
}

Done.addEventListener('click', showDoneTasks);
function showDoneTasks() {
  const getLocalStorageData = localStorage.getItem('New Todo 2');
  const listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
    !listArray[index].done ? document.querySelector(`#listItem${index}`).classList.add('invisible') : 
    document.querySelector(`#listItem${index}`).classList.remove('invisible');
  });
}

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

function showTasks(){
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
  deleteButton.addEventListener('click', () => deleteTask(element.id));
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

// delete task function
function deleteTask(index) {
  const getLocalStorageData = localStorage.getItem('New Todo 2');
  const listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem('New Todo 2', JSON.stringify(listArray));
  showTasks();
}


// Important section


function markImportant(index) {
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


// Done section


function markDone(index) {
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