const searchInput = document.getElementById('search');
const inputBox = document.querySelector('.newTask textarea');
const addBtn = document.querySelector('.newTask button');
const todoList = document.querySelector('.todoList');
const showAll = document.querySelector('#All');
const showImportant = document.querySelector('#Important');
const showActive = document.querySelector('#Active');
const showDone = document.querySelector('#Done');


showTasks(); //calling showTask function

// search 
 searchInput.oninput = () => {
  let getLocalStorageData = localStorage.getItem('New Todo 2');
  listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
    listArray[index].value.includes(searchInput.value) ? console.log('contains') : console.log('no');
    listArray[index].value.includes(searchInput.value) ? document.querySelector(`.item${index}`).classList.remove('invisible') :
    document.querySelector(`.item${index}`).classList.add('invisible');
  });
}

searchInput.onchange = function () {
  console.log('Значение изменено на: '+searchInput.value);
  //listArray[index].value == searchInput.value ? console.log('found') : console.log('no');
  };
//

// navigation
showAll.onclick = () =>{
  let getLocalStorageData = localStorage.getItem('New Todo 2');
  listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
  console.log(document.querySelector(`.item${index}`));
  document.querySelector(`.item${index}`).classList.remove('invisible');
  });
}

showImportant.onclick = ()=>{
  let getLocalStorageData = localStorage.getItem('New Todo 2');
  listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
    !listArray[index].important ? document.querySelector(`.item${index}`).classList.add('invisible') :
    document.querySelector(`.item${index}`).classList.remove('invisible');
  });
}

showActive.onclick = ()=>{
  let getLocalStorageData = localStorage.getItem('New Todo 2');
  listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
    !listArray[index].done ? document.querySelector(`.item${index}`).classList.remove('invisible') : 
    document.querySelector(`.item${index}`).classList.add('invisible');
  });
}

showDone.onclick = ()=>{
  let getLocalStorageData = localStorage.getItem('New Todo 2');
  listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
    !listArray[index].done ? document.querySelector(`.item${index}`).classList.add('invisible') : 
    document.querySelector(`.item${index}`).classList.remove('invisible');
  });
}
//


function init() {
  let getLocalStorageData = localStorage.getItem('New Todo 2');
  listArray = JSON.parse(getLocalStorageData);
  listArray.forEach((element, index) => {
    //listArray[index].important ? document.querySelector(`.item${index}`).style = localStorage.getItem('importantStyle') : null;
    listArray[index].important ? document.querySelector(`.item${index}`).classList.add('important') : null;
    //listArray[index].important ? document.querySelector(`.item${index} .importantButton`).style = localStorage.getItem('importantButtonStyle') : null;
    listArray[index].important ? document.querySelector(`.item${index} .importantButton`).classList.add('notImportantButton'): null;
    listArray[index].done ? document.querySelector(`.item${index}`).classList.add('done') : null;
  });
}


addBtn.onclick = ()=>{ //when user click on add button
  let userEnteredValue = inputBox.value; //getting input field value
  let getLocalStorageData = localStorage.getItem('New Todo 2'); //getting localstorage
  if(getLocalStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  }
  if(userEnteredValue.trim() != ''){
    let item = {value: userEnteredValue.trim(), 'important': false, done: false}
    listArray.push(item); //pushing or adding new object in array
    localStorage.setItem('New Todo 2', JSON.stringify(listArray)); //transforming js object into a json string
    showTasks(); //calling showTask function
    addBtn.classList.remove('active'); //unactive the add button once the task added
  }
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem('New Todo 2');
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  let newLiTag = '';
  listArray.forEach((element, index) => {
    newLiTag += `<li class='item${index} listItem'>
    <span>${element.value}</span></li>
    <button class='doneButton' type='button' onclick='markDone(${index})'><img src='tick-2.svg' alt='doneButton' ></button>
    <button class='importantButton' type='button' onclick='markImportant(${index})'></button>
    <button class='deleteButton' type='button' onclick='deleteTask(${index})'><img src='delete.png' alt='deleteButton' ></button>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ''; //once task added leave the input field blank
  init();
}

// delete task function
function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem('New Todo 2');
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem('New Todo 2', JSON.stringify(listArray));
  showTasks();
}


// Active section


function markImportant(index) {
  let getLocalStorageData = localStorage.getItem('New Todo 2'); //getting localstorage
  listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  if(!listArray[index].important) {
    listArray[index].important = true;
    localStorage.setItem('New Todo 2', JSON.stringify(listArray)); //transforming js object into a json string
    // стили убрать из кнопки и переместить в стили чтобы сохранялись
    document.querySelector(`.item${index}`).classList.toggle('important');
    document.querySelector(`.item${index} .importantButton`).classList.toggle('notImportantButton');
  }
  else {
    console.log('already in the list');
    listArray[index].important = false;
    localStorage.setItem('New Todo 2', JSON.stringify(listArray));
    //стили убрать
    document.querySelector(`.item${index}`).classList.toggle('important');
    document.querySelector(`.item${index} .importantButton`).classList.toggle('notImportantButton');
  }
  //show tasks
}


// Done section


function markDone(index) {
  let getLocalStorageData = localStorage.getItem('New Todo 2'); //getting localstorage
  listArray = JSON.parse(getLocalStorageData);

  if(!listArray[index].done){
    listArray[index].done = true;
    localStorage.setItem('New Todo 2', JSON.stringify(listArray)); 
    //
    document.querySelector(`.item${index}`).classList.toggle('done');
    document.querySelector(`.item${index} .doneButton`).classList.toggle('undoneButton');
  }
  else {
    console.log('already in the list');
    listArray[index].done = false;
    localStorage.setItem('New Todo 2', JSON.stringify(listArray));
    //
    document.querySelector(`.item${index}`).classList.toggle('done');
    document.querySelector(`.item${index} .doneButton`).classList.toggle('undoneButton');
  }
  // show tasks
}
