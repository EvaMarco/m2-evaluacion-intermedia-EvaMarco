'use strict'

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
function getRandomNumber(max) {
    return Math.ceil(Math.random() * max);
}

function close(event){
    name = inputName.value;
    modal.classList.add('hidden');
    return name
}

function reset(event){
    myRandomNumber = getRandomNumber(100);
    console.log(`Mi número aleatorio es ${myRandomNumber}`);
    historic.innerHTML += `<li> Reseteaste una partida </li>`; 
    tries = 0;
    triesOut.innerHTML = tries;
    return myRandomNumber;
}

function getHint(event){
    const userNum = input.value;
    if (userNum > myRandomNumber){
        hint.innerHTML = `Su número es mayor que el número buscado`
        tries += 1;
        triesOut.innerHTML = tries;
    }
    else if (userNum < myRandomNumber){
        hint.innerHTML = `Su número es menor que el número buscado`
        tries += 1;
        triesOut.innerHTML = tries;
    }
    else{
        hint.innerHTML = `¡Has ganado, ${name}!`
        tries += 1;
        triesOut.innerHTML = tries;
        historic.innerHTML += `<li>El numero a descubrir fue ${myRandomNumber} y tardaste ${tries} intentos en adivinarlo. Muy bien ${name}. </li>`
        myRandomNumber = getRandomNumber(100);
        console.log(`Mi número aleatorio es ${myRandomNumber}`);
        tries = 0;
    }
}

let myRandomNumber = getRandomNumber(100);
let tries = parseInt(triesOut.innerHTML);

console.log(`Mi número aleatorio es ${myRandomNumber}`);

btn.addEventListener('click', getHint);
btnReset.addEventListener('click', reset);
btnClose.addEventListener('click', close);