const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
getRandomUser();
getRandomUser();
// Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random() * 1000000)
    };
    addData(newUser);
};

// Add new obj to data array
function addData(obj) {
    data.push(obj);
    updateDOM();
}

// Double Money
const doubleMoney = () => {
    data = data.map(user => {
        return {...user, money:user.money * 2}
    })
    updateDOM()
}

// Sort By Richest
const sortByRichest = () => {
    data.sort((a, b) => {
        return b.money - a.money
    })
    updateDOM()
}

// Filter By Millionaires
const showMillionaires = () => {
    data = data.filter(millionaire => millionaire.money > 1000000);
    updateDOM();
}

// Calculate Total Wealth
const calculateWealth = () => {
    const wealth = data.reduce((acc,cur) => (acc += cur.money),0);
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3> Total Wealth: <strong>${formatMoney(wealth)}</strong> </h3>`;
    main.appendChild(wealthElement);
}

// Update Dom
function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}

// Format number as money 
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listener
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);