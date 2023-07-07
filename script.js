// 'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'David Afonso',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Ricardo Matos',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Ana Figueiredo',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sandra Souki',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const arrowIcon = document.getElementById('arrow');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAccount = false
let sortMovements = false

const displayMovements = function(account, sort = false) {
    containerMovements.innerHTML = ''
    movements = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements
    
    let type;
    let balance = 0
    let valueIn = 0
    let valueOut = 0
    let valueInterest = movements
    .filter(movement => movement > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((int, i, array) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

    movements.forEach(function(value, index, movements) {
      balance += value
      
      if(value > 0) {
        valueIn += value
        type = 'deposit'
      } else {
        valueOut += value
        type = 'withdrawal'
      }
      
      html = 
      `
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">${index+1} ${type.toUpperCase()}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${value} €</div>
      </div>
      `
      containerMovements.insertAdjacentHTML('afterbegin', html);
    })
    
    labelBalance.innerHTML = balance + ' €'
    labelSumIn.innerHTML = valueIn + ' €'
    labelSumOut.innerHTML = String(valueOut).replace('-', '') + ' €'
    labelSumInterest.innerHTML = valueInterest + ' €'
}

btnSort.addEventListener('click', function(e) {
  e.preventDefault()
  sortMovements = !sortMovements

  arrowIcon.classList.contains('rotate')
  ? arrowIcon.classList.remove('rotate')
  : arrowIcon.classList.add('rotate')

  displayMovements(currentAccount, sortMovements)
})
  
// ~~~~~ Login logic ~~~~~~

btnLogin.addEventListener('click', function(e) {
  e.preventDefault()
  accounts.forEach(function(account) {
    let user = account.owner.split(' ')
    username = user[0][0] + user[1][0]
    
    if(inputLoginUsername.value.toLowerCase().trim() === username.toLowerCase() && Number(inputLoginPin.value.trim()) === account.pin) {
      currentAccount = account
      containerApp.style.opacity = 100
      displayMovements(account)
    }
  })
})