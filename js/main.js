'use strict';

const input = document.querySelector('.js__input');
const btn = document.querySelector('.js__btn');
const hint = document.querySelector('.js__hint');
const triesOut = document.querySelector('.js__tries');
const historic = document.querySelector('.js__historic');
const btnReset = document.querySelector('.js__btn-reset');
const btnClose = document.querySelector('.js__btnClose');
const inputName = document.querySelector('.js__inputName');
const modal = document.querySelector('.js__modal');
let name = '';

let myRandomNumber = getRandomNumber(100);
let tries = parseInt(triesOut.innerHTML);

function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

function close() {
  name = inputName.value;
  modal.classList.add('hidden');
  return name;
}

function reset() {
  myRandomNumber = getRandomNumber(100);
  // eslint-disable-next-line no-console
  console.log(`Mi número aleatorio es ${myRandomNumber}`);
  historic.innerHTML += `<li> Reseteaste una partida </li>`;
  tries = 0;
  triesOut.innerHTML = tries;
  return myRandomNumber;
}

function getHint() {
  const userNum = parseInt(input.value);

  if (isNaN(userNum)) {
    hint.innerHTML = `Debes introducir un número en la caja.`;
  }
  else if (userNum < 0 || userNum > 100) {
    hint.innerHTML = `Debes introducir un número entre el 0 y el 100.`;
  }
  else if (userNum > myRandomNumber) {
    hint.innerHTML = `Su número es mayor que el número buscado`;
    tries += 1;
    triesOut.innerHTML = tries;
  }
  else if (userNum < myRandomNumber) {
    hint.innerHTML = `Su número es menor que el número buscado`;
    tries += 1;
    triesOut.innerHTML = tries;
  }
  else {
    hint.innerHTML = `¡Has ganado, ${name}!`;
    tries += 1;
    triesOut.innerHTML = tries;
    historic.innerHTML += `<li>El numero a descubrir fue ${myRandomNumber} y tardaste ${tries} intentos en adivinarlo. Muy bien ${name}. </li>`;
    myRandomNumber = getRandomNumber(100);
    tries = 0;
  }
}

btn.addEventListener('click', getHint);
btnReset.addEventListener('click', reset);
btnClose.addEventListener('click', close);