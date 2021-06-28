const ids = ['trivia','math','year','date'];

document.addEventListener('load',loadFromStorage(ids));


function loadFromStorage(keys){
    keys.forEach((key)=>{
        let array= [];
        json = localStorage.getItem(key);
        array = JSON.parse(json);
        array.forEach((elem)=>{
            let div = document.createElement('div');
            let card = document.createElement('div');
            let p = document.createElement('p');
            let button = document.createElement('a');
            div.setAttribute('class','card mt-3');
            div.setAttribute('id','grandpa');
            card.setAttribute('class','card-body');
            p.setAttribute('class','card-text');
            button.setAttribute('value',key);
            button.setAttribute('class','btn btn-info');
            button.addEventListener('click',deleteElem);
            p.innerText=elem;
            button.innerText = 'Delete';
            
            card.appendChild(p);
            card.appendChild(button);
            div.appendChild(card);
            document.getElementById(key).appendChild(div);

        })
    })
}


function deleteElem(){
    let fact = this.previousSibling.innerText;
    let key = this.getAttribute('value');
    let  array = []
    json = localStorage.getItem(key);
    array = JSON.parse(json);
    let index = array.indexOf(fact);
    console.log(index);
     array.splice(index,1)
     json = JSON.stringify(array);
     localStorage.setItem(key,json);
    let deleteEl = this.closest("#grandpa")
    deleteEl.remove();
}