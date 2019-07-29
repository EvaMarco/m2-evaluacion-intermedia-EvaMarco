'use strict'

const input = document.querySelector('.js__input');
const btn = document.querySelector('.js__btn');
const hint = document.querySelector('.js__hint');
const triesOut = document.querySelector('.js__tries');
const historic = document.querySelector('.js__historic');

function getRandomNumber(max) {
    return Math.ceil(Math.random() * max);
}


let myRandomNumber = getRandomNumber(100);

console.log(`Mi número aleatorio es ${myRandomNumber}`);

let tries = parseInt(triesOut.innerHTML);

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
        hint.innerHTML = `¡Has ganado, Campeona!`
        tries += 1;
        triesOut.innerHTML = tries;
        historic.innerHTML += `<li>El numero a descubrir fue ${myRandomNumber} y tardaste ${tries} intentos en adivinarlo. </li>`
        myRandomNumber = getRandomNumber(100);
        console.log(`Mi número aleatorio es ${myRandomNumber}`);
        tries = 0;
    }
}

btn.addEventListener('click', getHint);
