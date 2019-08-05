'use strict';

const main = document.querySelector('.js__main');
const input = document.querySelector('.js__input');
const btn = document.querySelector('.js__btn');
const hint = document.querySelector('.js__hint');
const triesOut = document.querySelector('.js__tries');
const historic = document.querySelector('.js__historic');
const btnReset = document.querySelector('.js__btn-reset');
const btnClose = document.querySelector('.js__btnClose');
const btnNew = document.querySelector('.js__btn-new');
const inputName = document.querySelector('.js__inputName');
const modal = document.querySelector('.js__modal');
const aside = document.querySelector('.js__aside');
const diffEasy = document.querySelector('.js__diff1');
const diffMed= document.querySelector('.js__diff2');
const diffHigh = document.querySelector('.js__diff3');
const btnHistoricReset = document.querySelector('.js__historic_reset');
const tryBox = document.querySelector('.js__tryBox');
const diffBox = document.querySelector('.js__diffBox');

let tryArray = '';
let name = '';
let myRandomNumber = getRandomNumber(100);
let tries = 0;
let maxtries = 19;
let historicList = [];
let game ={
  'name': '',
  'tries': '',
  'number': '',
  'reset': '',
  'win':''
};
function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}
function init() {
  maxDiv();
  if(localStorage.getItem('historicList')){
    historicList = [];
  }else{
    historicList = JSON.parse(localStorage.getItem('historicList'));
  }
  // eslint-disable-next-line no-console
  console.log(`Mi número aleatorio es ${myRandomNumber}`);
  if(localStorage.getItem('historicList') !== '' && localStorage.getItem('historicList') !== [] && localStorage.getItem('historicList') !== null){
    const returnList = JSON.parse(localStorage.getItem('historicList'));
    for (const item of returnList){
      if(item.reset === false){
        historic.innerHTML += `<li class="list__item">El numero a descubrir fue ${item.number} y tardaste ${item.tries} intentos en adivinarlo. Muy bien ${item.name}. </li>`;
      }
      else if(item.win === false){
        historic.innerHTML += `<li class="list__item">El numero a descubrir fue ${myRandomNumber} y ${name} no consiguió descubrirlo. ¡Seguro que a la siguiente sí!. </li>`;
      }
      else{
        historic.innerHTML += `<li class="list__item"> ${item.name}, reseteó una partida tras ${item.tries} intentos. </li>`;
      }
    }
  }
}
function maxDiv(){
  for (let i = 1; i<=maxtries; i++){
    diffBox.innerHTML +=`
    <div class="try try${i}"></div>
    `;
  }
  tryArray = document.querySelectorAll('.try');
}
function changeDiff (event) {
  if (event.currentTarget.value === '1') {
    maxtries = 19;
    diffBox.classList.remove('med');
    diffBox.classList.remove('hard');
    diffBox.classList.add('easy');
  }
  else if (event.currentTarget.value === '2') {
    maxtries = 9;
    diffBox.classList.remove('easy');
    diffBox.classList.remove('hard');
    diffBox.classList.add('med');
  }
  else if(event.currentTarget.value === '3'){
    maxtries = 4;
    diffBox.classList.remove('med');
    diffBox.classList.remove('easy');
    diffBox.classList.add('hard');
  }
  diffBox.innerHTML ='';
  maxDiv();
}
function enterClose() {
  if (event.keyCode === 13) {
    close();
  }
}
function close() {
  triesOut.innerHTML = tries;
  modal.classList.add('hidden');
  aside.classList.remove('hidden');
  tryBox.classList.remove('hidden');
  name = inputName.value;
  return name;
}
function enter() {
  if (event.keyCode === 13) {
    getHint();
  }
}
function fillColor(){
  let num = tries;
  let color = 'red';
  let randNum =  Math.floor(Math.random()*4 + 1);
  if(randNum === 1){
    color = 'red';
  }
  else if(randNum === 2){
    color = 'green';
  }
  else if(randNum === 3){
    color = 'yellow';
  }
  else{
    color = 'blue';
  }
  for(const item of tryArray){
    if(item.classList.contains(`try${num}`)){
      item.style.backgroundColor = `${color}`;
    }
  }
}
function getHint() {
  const userNum = parseInt(input.value);
  if(tries < maxtries){
    if (isNaN(userNum)) {
      hint.innerHTML = `Debes introducir un número en la caja.`;
      main.style.backgroundImage = 'url(../image/choosesomething.jpeg)';
    }
    else if (userNum < 0 || userNum > 100) {
      hint.innerHTML = `Debes introducir un número entre el 0 y el 100.`;
      main.style.backgroundImage = 'url(../image/choosesomething.jpeg)';
    }
    else if (userNum > myRandomNumber) {
      hint.innerHTML = `Demasiado alto`;
      main.style.backgroundImage = 'url(../image/chooseBad.jpeg)';
      tries += 1;
      triesOut.innerHTML = tries;
      fillColor();
      input.value = '';
    }
    else if (userNum < myRandomNumber) {
      hint.innerHTML = `Demasiado bajo`;
      main.style.backgroundImage = 'url(../image/chooseGood.jpeg)';
      tries += 1;
      triesOut.innerHTML = tries;
      fillColor();
      input.value = '';
    }
    else {
      hint.innerHTML = `¡Has ganado, ${name}!`;
      main.style.backgroundImage = 'url(../image/win.jpeg)';
      tries += 1;
      triesOut.innerHTML = tries;
      historic.innerHTML += `<li class="list__item">El numero a descubrir fue ${myRandomNumber} y tardaste ${tries} intentos en adivinarlo. Muy bien ${name}. </li>`;
      game ={
        'name': name,
        'tries': tries,
        'number': myRandomNumber,
        'reset': false,
        'win':true
      };
      if(historicList === null){
        historicList = [game];
        localStorage.setItem('historicList', JSON.stringify(historicList));
      }
      else{
        historicList.push(game);
        localStorage.setItem('historicList', JSON.stringify(historicList));
      }
      myRandomNumber = getRandomNumber(100);
      tries = 0;
      btnNew.classList.toggle('hidden');
      btnReset.classList.toggle('hidden');
      input.value = '';
    }
  }else{
    main.style.backgroundImage = 'url(../image/gameover.jpeg)';
    hint.innerHTML = `Has perdido, ${name}!`;
    historic.innerHTML += `<li class="list__item">El numero a descubrir fue ${myRandomNumber} y ${name} no consiguió descubrirlo. ¡Seguro que a la siguiente sí!. </li>`;
    tries += 1;
    triesOut.innerHTML = tries;
    game ={
      'name': name,
      'tries': tries,
      'number': myRandomNumber,
      'reset': false,
      'win':false
    };
    historicList.push(game);
    localStorage.setItem('historicList', JSON.stringify(historicList));
    fillColor();
    btnNew.classList.toggle('hidden');
    btnReset.classList.toggle('hidden');
    tries = 0;
    input.value = '';
  }
}
function reset() {
  myRandomNumber = getRandomNumber(100);
  // eslint-disable-next-line no-console
  console.log(`Mi número aleatorio es ${myRandomNumber}`);
  main.style.backgroundImage = 'url(../image/guess2.jpeg)';
  historic.innerHTML += `<li class="list__item"> ${name}, reseteó una partida tras ${tries} intentos. </li>`;
  hint.innerHTML = `Escribe un número y dale a prueba`;
  tries = 0;
  triesOut.innerHTML = tries;
  input.value = ``;
  game ={
    'name': name,
    'tries': tries,
    'number': myRandomNumber,
    'reset':true,
    'win': false
  };
  historicList.push(game);
  localStorage.setItem('historicList', JSON.stringify(historicList));
  diffBox.innerHTML ='';
  maxDiv();
  return myRandomNumber;
}
function newGame() {
  main.style.backgroundImage = 'url(../image/guess2.jpeg)';
  myRandomNumber = getRandomNumber(100);
  // eslint-disable-next-line no-console
  console.log(`Mi número aleatorio es ${myRandomNumber}`);
  hint.innerHTML = `Escribe un número y dale a prueba`;
  tries = 0;
  triesOut.innerHTML = tries;
  input.value = ``;
  btnNew.classList.toggle('hidden');
  btnReset.classList.toggle('hidden');
  diffBox.innerHTML ='';
  maxDiv();
  return myRandomNumber;
}
function cleanHistoric(){
  localStorage.removeItem('historicList');
  historicList =[];
  historic.innerHTML = '';
}

diffEasy.addEventListener('change', changeDiff);
diffMed.addEventListener('change', changeDiff);
diffHigh.addEventListener('change', changeDiff);
btn.addEventListener('click', getHint);
btnReset.addEventListener('click', reset);
btnClose.addEventListener('click', close);
input.addEventListener('keyup', enter);
inputName.addEventListener('keyup', enterClose);
btnNew.addEventListener('click', newGame);
btnHistoricReset.addEventListener('click', cleanHistoric);

init();
