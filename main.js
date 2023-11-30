const inputNumber = document.querySelector('.input_number');
const inputName = document.querySelector('.input_name');
const inputMonth = document.querySelector('.input_month');
const inputYear = document.querySelector('.input_year');
const inputCvv = document.querySelector('.input_cvv');
const cardFocus = document.querySelector('.card_focus');
const inputUrl = document.querySelector('.input_url');
const visaCard = document.querySelector('.card_add'); 
const visaNumber = document.querySelector('.visa_number p');
const visaName = document.querySelector('.visa_name ul');
const visaMonth = document.querySelector('.visa_date-month');
const visaYear = document.querySelector('.visa_date-year');
const cardCvv = document.querySelector('.card_cvv p');
const removebtn = document.querySelector('.remove_data');
const allInputs = document.querySelector('.content').querySelectorAll('input');
const cardFrontBack = visaCard.querySelectorAll('.visa_card');

let gerLetters = /[^A-za-zA]/g;
let gerNumber = /[^0-9]/g;
let gerSpace = /\s/g;
let urlPicrute = 'https://images5.alphacoders.com/132/1325121.png';
_cardPicture()



// event
document.addEventListener('click', cancleChack);
inputNumber.addEventListener('click', (el)=>{
    cardFocus.id = 'focus_number';
});
inputName.addEventListener('click', ()=>{
    cardFocus.id = 'focus_name';
});
inputMonth.addEventListener('click', ()=>{
    cardFocus.id = 'focus_date';
});
inputYear.addEventListener('click', ()=>{
    cardFocus.id = 'focus_date';
});
inputCvv.addEventListener('click', ()=>{
    cardRotate()
})
inputUrl.addEventListener('keyup', _cardPicture);



inputNumber.oninput = function(){
    this.value = this.value.replace(gerNumber, '').substr(0,16);
    let arrInput = this.value.split('');
    let arrNumber = visaNumber.innerHTML.replace(gerSpace, '').split('');
    let indexNum = arrInput.length -1;

    arrNumber[indexNum] = arrInput[indexNum];
    if(indexNum>=4 && indexNum<=11){arrNumber[indexNum]= '*'}
    arrNumber.splice(4,0,' ');
    arrNumber.splice(9,0,' ');
    arrNumber.splice(14,0,' ');
    visaNumber.innerHTML = arrNumber.join('');
}
inputName.oninput = function(){
    this.value = this.value.replace(gerLetters,'').substr(0,16);
    visaName.innerHTML = this.value
}
inputMonth.oninput = function(){
    this.value = this.value.replace(gerNumber,'').substr(0,2);
    if(+this.value > 12 || this.value == '00'){
        this.value = this.value.substr(0,1)
    }else{
        visaMonth.innerHTML = this.value
    }
}
inputYear.oninput = function(){
    this.value = this.value.replace(gerNumber,'').substr(0,2);
    if(+this.value < 23 || +this.value > 35){
        this.value = this.value.substr(0,1)
    }else{
        visaYear.innerHTML = this.value
    }
}
inputCvv.oninput = function(){
    this.value = this.value.replace(gerNumber,'').substr(0,6);

    let arrCvv = cardCvv.innerHTML.split('');
    arrCvv[this.value.length] = '*'
    cardCvv.innerHTML = arrCvv.join('')
}

function _cardPicture(){ 
    cardFrontBack.forEach(el=>{
     if(inputUrl.value == ''){
         el.style = `background-image:url(${urlPicrute}) ;`
     }else{el.style = `background-image:url('${inputUrl.value}') ;`}
    })
}
function removeInputs(){
    allInputs.forEach(el=>{
        el.value = '';
        visaNumber.innerHTML = '#### #### #### ####';
        visaName.innerHTML = '';
        visaMonth.innerHTML = '##';
        visaYear.innerHTML = '##';
        cardCvv.innerHTML = '';
        _cardPicture()
    })
}
function cardRotate(){
    let cardFront = visaCard.querySelector('.front_card');
    let cardBack =  visaCard.querySelector('.back_card');

    cardFront.classList.add('card_rotate_front');
    cardBack.classList.add('card_rotate_back');

    document.addEventListener('click', (el)=>{
        let clickCheck = el.composedPath()[0].className
    
        if(clickCheck !== 'input_cvv'){
            cardFront.classList.remove('card_rotate_front');
            cardBack.classList.remove('card_rotate_back');
        }
    });
}
function cancleChack(el){
    let clickCheck = el.composedPath()[0].dataset.input;

    if(clickCheck !== 'input'){
        cardFocus.id = '';
    }
}
function saveDataInput(){
    let objInArray = {}
    allInputs.forEach(el=>{
        let index = el.className.replace(/input_/g,'');
        if(el.value !== ''){
        let meaning = el.value;
        objInArray[index] = meaning;
        }
    })
    if(Object.keys(objInArray).length > 4 && objInArray.number.length == 16){
       
        if(saveDataBase.length == 0){
            saveDataBase.push(objInArray);
            alert('сохранено')
            removeInputs()
        }else{
            saveDataBase.forEach(obj=>{
                if(obj.number !== objInArray.number){
                    saveDataBase.push(objInArray);
                    alert('сохранено')
                    removeInputs()
                }
            })
        }
    }else{
        alert('Заполните все поля')
    }
    console.log(saveDataBase);
    return saveDataBase;
}

