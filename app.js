/* Что еще реализовать:
!добавить проект на гитхаб - done
1) подсветку дроп-зон - done
2) добавить большой перечень животных и птиц и выбирать их рандомно из файла json
3) довабить всплывающие окна при неправильном шаге - наверное пока обойдемся без этого
4) добавить кнопку "начать сначала" - добавлено попап окно при завершении игры. добавить меню, чтобы была позможность перезапустить игру в процессе
*/



//общий массив животных
const allArray = [
    {'name':'animal', 'pic': 'https://source.unsplash.com/6GMq7AGxNbE/500x500'},
    {'name':'animal', 'pic': 'https://source.unsplash.com/GHOiyov2TSQ/500x500'},
    {'name':'animal', 'pic': 'https://source.unsplash.com/lIeqGEdvex0/500x500'},
    {'name':'bird', 'pic': 'https://source.unsplash.com/wTPp323zAEw/500x500'},
    {'name':'bird', 'pic': 'https://source.unsplash.com/xWQcud4Xtr4/500x500'},
    {'name':'bird', 'pic': 'https://source.unsplash.com/OjhSUsHUIYM/500x500'},
    {'name':'animal', 'pic': 'https://source.unsplash.com/UlipBbZpweg/500x500'},
    {'name':'animal', 'pic': 'https://source.unsplash.com/K22SK31G-QM/500x500'},
    {'name':'bird', 'pic': 'https://source.unsplash.com/edrW8VIlJJg/500x500'},
    {'name':'bird', 'pic': 'https://source.unsplash.com/dk0OcyYfZKY/500x500'},
    {'name':'animal', 'pic': 'https://source.unsplash.com/xUUZcpQlqpM/500x500'},
    {'name':'animal', 'pic': 'https://source.unsplash.com/adK3Vu70DEQ/500x500'},
    {'name':'animal', 'pic': 'https://source.unsplash.com/7h06P9UKhYY/500x500'},
    {'name':'bird', 'pic': 'https://source.unsplash.com/WyDXNgmq8RE/500x500'},
    {'name':'bird', 'pic': 'https://source.unsplash.com/2a1fvSaGhgs/500x500'},
    {'name':'bird', 'pic': 'https://source.unsplash.com/Ak81Vc-kCf4/500x500'},
    {'name':'animal', 'pic': 'https://source.unsplash.com/wg6tsOBbGb0/500x500'},
    {'name':'bird', 'pic': 'https://source.unsplash.com/OjQgsR1oyEw/500x500'},
    {'name':'bird', 'pic': 'https://source.unsplash.com/UIu4RmMxnHU/500x500'},
    {'name':'animal', 'pic': 'https://source.unsplash.com/-iZV3CqT7LM/500x500'},
];



const startBtn = document.querySelector('#start');

const allDropPlace = document.querySelector('.all');



const dragItems = document.querySelectorAll('.item');
const dropZones = document.querySelectorAll('.drop-place');
//console.log(dropZones.length)

const popupBg = document.querySelector('.popup-bg');
const newGameBtn = document.querySelector('.new-game');
let numCards = 5;

const cardBtns = document.querySelectorAll('.cards-button');
cardBtns.forEach(card => {
    card.addEventListener('click', event =>{
        event.preventDefault();
        numCards = event.target.id;
        generateCreatures();
        document.querySelectorAll('.screen')[1].classList.add('up');
    });
});


startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelectorAll('.screen')[0].classList.add('up');
});

// allDropPlace.addEventListener('dragstart', event =>{
//     if(event.target.classList.contains('item')){
//         dragStart(event);
//     }

// });

// allDropPlace.addEventListener('dragend', event =>{
//     if(event.target.classList.contains('item')){
//         dragEnd(event);
//     }

// });

// dragItems.forEach(dragItem => {
//     dragItem.addEventListener('dragstart', dragStart);
//     dragItem.addEventListener('dragend', dragEnd);

// });

dropZones.forEach(dropZone => {
    dropZone.addEventListener('dragenter', dragEnter);
    dropZone.addEventListener('dragleave', dragLeave);
    dropZone.addEventListener('drop', dropItem);
    dropZone.addEventListener('dragover', dragOver);
});

newGameBtn.addEventListener('click', ()=>{
    document.location.reload();
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
     } else if (event.target.tagName === 'IMG' && !event.target.parentElement.parentElement.classList.contains('all') ) {
         event.target.parentElement.parentElement.classList.add('drop-place--choosen');
     }
    // } else if (event.target.classList.contains('item')){
    //     event.target.parentElement.classList.add('drop-place--choosen');
    // }
}

function dragLeave(event){
    if(event.target.classList.contains('animals') || event.target.classList.contains('birds')){
    event.target.classList.remove('drop-place--choosen'); }

}

function dragOver(event){
    event.preventDefault();
}

function dropItem(event) {
    console.log('!', draggedItem.classList[1]);
    switch (draggedItem.classList[1]) {
        case ('animal'):
            if (event.target.classList.contains('animals') || event.target.parentElement.parentElement.classList.contains('animals')) {
                if (event.target.tagName.toLowerCase() === 'img') {
                    //console.log(event.target.parentElement.parentElement);
                    event.target.parentElement.parentElement.append(draggedItem);
                } else {
                    event.target.append(draggedItem);
                }
            }

            break;
        case ('bird'):
            if (event.target.classList.contains('birds') || event.target.parentElement.parentElement.classList.contains('birds')) {
                if (event.target.tagName.toLowerCase() === 'img') {
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
    if(event.target.parentElement.parentElement.classList.contains('drop-place--choosen')){

        event.target.parentElement.parentElement.classList.remove('drop-place--choosen');
    }

    draggedItem.classList.remove('hide');
    draggedItem = null;

    //currentStep++;
    if (allDropPlace.childElementCount == 0) {
        //setTimeout(()=>alert('You WIN!!'), 1000);
        popupBg.style.zIndex = '9';
        popupBg.style.opacity = '1';
    }
}




//перетасовать массив
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
  
      // поменять элементы местами
      // мы используем для этого синтаксис "деструктурирующее присваивание"
      // подробнее о нём - в следующих главах
      // то же самое можно записать как:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

//динамическое заполнение области животными и птицами


function generateCreatures(){
    shuffle(allArray);
    for(let i = 0; i<numCards; i++){
        let div = document.createElement('div');
        div.classList.add('item', allArray[i].name);
        div.draggable = 'true';
        let img = document.createElement('img');
        img.src = allArray[i].pic;
        img.alt = allArray[i].name;
        img.draggable = false;
        div.append(img);
        allDropPlace.append(div);
        div.addEventListener('dragstart', dragStart);
        div.addEventListener('dragend', dragEnd);
    }

}