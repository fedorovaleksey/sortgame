/* Что еще реализовать:
!добавить проект на гитхаб - done
1) подсветку дроп-зон - done
2) добавить большой перечень животных и птиц и выбирать их рандомно из файла json
3) довабить всплывающие окна при неправильном шаге
4) добавить кнопку "начать сначала" 
*/

//массивы птиц и млекопитающих
const animalsArray = ['https://source.unsplash.com/UlipBbZpweg/500x500',
'https://source.unsplash.com/K22SK31G-QM/500x500',
'https://source.unsplash.com/6GMq7AGxNbE/500x500',
'https://source.unsplash.com/GHOiyov2TSQ/500x500',
'https://source.unsplash.com/lIeqGEdvex0/500x500'];
const birdsArray = ['https://source.unsplash.com/edrW8VIlJJg/500x500',
'https://source.unsplash.com/dk0OcyYfZKY/500x500',
'https://source.unsplash.com/wTPp323zAEw/500x500',
'https://source.unsplash.com/xWQcud4Xtr4/500x500',
'https://source.unsplash.com/OjhSUsHUIYM/500x500'];

const numOfSteps = animalsArray.length + birdsArray.length;
let currentStep = 0;

const startBtn = document.querySelector('#start');

const allDropPlace = document.querySelector('.all');

generateCreatures();

const dragItems = document.querySelectorAll('.item');
const dropZones = document.querySelectorAll('.drop-place');
//console.log(dropZones.length)


startBtn.addEventListener('click', event => {
    document.querySelectorAll('.screen')[0].classList.add('up');
});


dragItems.forEach(dragItem => {
    dragItem.addEventListener('dragstart', dragStart);
    dragItem.addEventListener('dragend', dragEnd);

});

dropZones.forEach(dropZone => {
    dropZone.addEventListener('dragenter', dragEnter);
    dropZone.addEventListener('dragleave', dragLeave);
    dropZone.addEventListener('drop', dropItem);
    dropZone.addEventListener('dragover', dragOver);
});

let draggedItem = null;

function dragEnd(event){
    event.preventDefault();
    event.target.classList.remove('hide');
    //console.log(event.target);
    draggedItem = null;
}

function dragStart(event){
    setTimeout(() => event.target.classList.add('hide'), 0);
    console.log(event.target);
    draggedItem = event.target;
}

function dragEnter(event){
    if(event.target.classList.contains('birds') || event.target.classList.contains('animals')){
        event.target.classList.add('drop-place--choosen');
    }
}

function dragLeave(event){
    event.target.classList.remove('drop-place--choosen');

}

function dragOver(event){
    event.preventDefault();
}

function dropItem(event){
    console.log('!', draggedItem.classList[1]);
    switch(draggedItem.classList[1]){
        case('animal'):
            if(event.target.classList.contains('animals') || event.target.parentElement.parentElement.classList.contains('animals')){
                if(event.target.tagName.toLowerCase() === 'img'){
                    //console.log(event.target.parentElement.parentElement);
                    event.target.parentElement.parentElement.append(draggedItem);
                } else {
                    event.target.append(draggedItem);
                }
            }
            
        break;
        case('bird'):
            if(event.target.classList.contains('birds') || event.target.parentElement.parentElement.classList.contains('birds')){
                if(event.target.tagName.toLowerCase() === 'img'){
                    //console.log(event.target.parentElement.parentElement);
                    event.target.parentElement.parentElement.append(draggedItem);
                } else {
                    event.target.append(draggedItem);
                }
            }
            
        break;
        default:
            console.log('default part');
            break;
    }

    event.target.classList.remove('drop-place--choosen');
            currentStep++;
            if(allDropPlace.childElementCount == 0){
                alert('You WIN!!');
            }
}



function generateNumArray(){
    let i = 0;
    const numArray = [];
    while(i<5){
        let num = Math.floor(Math.random()*20);
        console.log(num);
        if(!numArray.includes(num)){
            numArray[i] = num;
            i++;
        }
    }
}

//динамическое заполнение области животными
function generateCreatures(){
    for(let i = 0; i<animalsArray.length; i++){
        let div = document.createElement('div');
        div.classList.add('item', 'animal');
        div.draggable = 'true';
        let img = document.createElement('img');
        img.src = animalsArray[i];
        img.draggable = false;
        div.append(img);
        allDropPlace.append(div);

        div = document.createElement('div');
        div.classList.add('item', 'bird');
        div.draggable = 'true';
        img = document.createElement('img');
        img.src = birdsArray[i];
        img.draggable = false;
        div.append(img);
        allDropPlace.append(div);
    }
}