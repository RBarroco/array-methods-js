/* 
   const arr = [1,2,3,4,5];
   const total = arr.reduce((acc, num) => (acc + num), 0)
*/

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

//array of objects;
let data = [];
let userNumber = 0;

getRandomUser((userNumber = userNumber + 1));
getRandomUser((userNumber = userNumber + 1));
getRandomUser((userNumber = userNumber + 1));

// Fetch random user and add money
async function getRandomUser(number) {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    const user = data[number];

    const newUser = {
      name: `${user.username} ${user.name}`,
      money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// filter only millionaires
function showMillionaires() {
  data = data.filter(user => user.money >= 1000000);
  updateDOM();
}

// Double everyone's money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Calculate total
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);
  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear Main Div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  // .forEach(item, index, arr) we pass a callback inside of the     .forEach()
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
sortBtn.addEventListener('click', sortByRichest);
doubleBtn.addEventListener('click', doubleMoney);
addUserBtn.addEventListener('click', function() {
  if (userNumber > 9) {
    userNumber = 9;
  } else if (userNumber < 0) {
    userNumber = 0;
  } else {
    userNumber = userNumber + 1;
    getRandomUser(userNumber);
  }
});

// doubleBtn.addEventListener('click', function() {
//   data.map(item => (item.money = item.money * 2));
//   updateDOM();
// });
