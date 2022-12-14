import populate from './modules/populateFunction.js';
import tasks from './modules/objects.js';
import loadTasks from './modules/displayfromLS.js';

const newList = document.querySelector('[data-new-list]');
const newInput = document.querySelector('[data-new-input]');
const clear = document.querySelector('.clear');

const saveToStorage = (newTask) => {
  localStorage.setItem('store_now', JSON.stringify(newTask));
};

const indexFunc = () => tasks.length + 1;

const createNewList = (name) => ({ index: indexFunc(), description: name, completed: false });

newList.addEventListener('submit', (e) => {
  e.preventDefault();
  const listValue = newInput.value;
  if (listValue === null || listValue === '') return;
  const list = createNewList(listValue);
  populate(list);
  tasks.push(list);
  saveToStorage(tasks);
  newList.reset();
});

// On load Display all Tasks
loadTasks();

// Function to clear all checked boxes
clear.addEventListener('click', () => {
  const tasksAll = JSON.parse(localStorage.getItem('store_now'));
  const filteredList = tasksAll.filter((obj) => obj.completed !== true);
  localStorage.setItem('store_now', JSON.stringify(filteredList));
  window.location.reload();
});
