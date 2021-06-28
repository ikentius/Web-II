const selectOpt = document.getElementById('infotype');
const switchButton = document.getElementById('autoOnOff');
const input = document.getElementById('manualinput');
const blankContainer = document.getElementById('container');
const randomSingle = document.getElementById('randomSingleTime');



selectOpt.addEventListener('change',loadFact);
switchButton.addEventListener('click',switchOnOff);
input.addEventListener('input',loadFact);
randomSingle.addEventListener('click',loadFactsRandmoly)


let switchController = -1;
let timer;


function createFetchLink(number){
  let infotype = selectOpt.value;
  return `http://numbersapi.com/${number}/${infotype}`;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


function fetchAndfill(fetchLink){
  let button = document.createElement('a');
  let text = document.createElement('p');
  let card = document.createElement('div');
  let cardBody = document.createElement('div');
  fetch(fetchLink)
  .then(response => response.text())
  .then(data => {
    blankContainer.innerHTML = '';
    text.innerText = data;
    button.innerText = 'Save';
    button.setAttribute('id','addToFavorites');
    button.setAttribute('class','btn btn-info');
    text.setAttribute('id','factText');
    text.setAttribute('class', 'card-text');
    card.setAttribute('class','card text-center');
    cardBody.setAttribute('class','card-body');
    cardBody.setAttribute('id','grandpa');
    cardBody.appendChild(text);
    cardBody.appendChild(button);
    button.addEventListener('click',sendToFavorites)
    card.appendChild(cardBody);
    blankContainer.appendChild(card);
  })
  .catch(err=> console.log(err));
}



function switchOnOff(){
  switchController+=1;
  if(switchController%2 === 1){
    clearInterval(timer);
  }else{
    loadFactsRandmoly();
    timer = setInterval(loadFactsRandmoly,5000);
  }
  console.log(switchController);
}

//main functions

function loadFact(){
  let number = input.value;
  console.log(isNaN(number));
  if(number != '' && !isNaN(number)){
  fetchAndfill(createFetchLink(number));
}else{
  blankContainer.innerHTML = '';
}
}



 function loadFactsRandmoly(){
  let randomNum = getRndInteger(0,1000);
  input.value = randomNum;
  loadFact();
}

function sendToFavorites(){
 let getText = document.getElementById('factText');
 let localStorageKey = selectOpt.value;
 let array = [];
 let text = getText.innerText;
 let json;
 if(localStorage.getItem(localStorageKey)===null){
  array.push(text);
  json = JSON.stringify(array);
  localStorage.setItem(localStorageKey,json);
 }else{
   json = localStorage.getItem(localStorageKey);
   array = JSON.parse(json);
   if(array.includes(text)){
     alert("Why do you want to keep same fact twice ?");
   }else{
     array.push(text);
     json = JSON.stringify(array);
     localStorage.setItem(localStorageKey,json);
   }
   
 }
  

}