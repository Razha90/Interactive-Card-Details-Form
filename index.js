// Function Name And Card Number
var name = '';
var cardNumber = '';
var dateMM = '';
var dateYY = '';
var dataCVC = '';

var myName = document.getElementById('myName');
var myNumber = document.getElementsByClassName('number-card')[0];
var getName = document.getElementsByClassName('full-input')[0];
var getNumber = document.getElementsByClassName('full-input')[1];
var danger = document.querySelectorAll('small');
const checkingInfo = {
    CardName: false,
    CardCredit: false,
    CardMM: false,
    CardYY:false,
    CardCVC:false
}
getName.addEventListener('input', e => {
    name = e.target.value;
    myName.textContent = name;
    if (name == '') {
        myName.textContent = 'Jane Applessed';
    }
    nameFunc(name);
});
function nameFunc(you) {
    let e = document.querySelectorAll('input')[0];
    if (you.length < 5) {
        information('CardHolder Name is too Short!!' , 0 , 'hsl(0, 100%, 66%)')
        e.style.border = '2px solid hsl(0, 100%, 66%)';
        checkingInfo.CardName = false;
    } else {
        information('-', 0 , 'white');
        e.style.border = '2px solid hsl(249, 100%, 64%)';
        checkingInfo.CardName = true ;
    }
}

getNumber.addEventListener('input', e=> {
    cardNumber =  cc_format(e.target.value);
    myNumber.textContent = cardNumber;
    getNumber.value = cardNumber;
    if (cardNumber == '') {
        myNumber.textContent = '0000 0000 0000 0000';
    }
    numberFunc(cardNumber);
})
function numberFunc(you) {
    let e = document.querySelectorAll('input')[1];
    if (you.length == 19) {
        information('-', 1 , 'white')
        e.style.border = '2px solid 	hsl(249, 100%, 64%)';
        checkingInfo.CardCredit = true;
    } else {
        e.style.border = '2px solid hsl(0, 100%, 66%)';
        information('You Must Input 16 Digits!!', 1 , 'hsl(0, 100%, 66%)')
        checkingInfo.CardCredit = false;
    }
}

function cc_format(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
    }

    if (parts.length) {
        return parts.join(' ')
    } else {
        return value
    }
}

//-----------------------------------------------------

// Function EXP Date 
var getMM = document.getElementsByClassName('valueMM')[0];
var getYY = document.getElementsByClassName('valueYY')[0];
var MM = document.getElementById('mm');
var YY = document.getElementById('yy');
getMM.addEventListener('input', e => {
    dateMM = numberFormat(e.target.value);
    MM.textContent = dateMM;
    if (dateMM > 12) {
        MM.textContent = 12;
        getMM.value = 12;
    }
    mmFunc(e.target.value);
});

function mmFunc(you) {
    let e = document.querySelectorAll('input')[2];
    if ( you.length == '') {
        information("Can't be blank!!", 2 , 'hsl(0, 100%, 66%)');
        e.style.border = '2px solid hsl(0, 100%, 66%)';
        checkingInfo.CardMM = false;
    } else {
        information("-", 2 , 'white');
        e.style.border = '2px solid 	hsl(249, 100%, 64%)';
        checkingInfo.CardMM = true;
    }
}

getYY.addEventListener('input', e=> {
    let you = e.target.value;
    dateYY = numberFormat(you)
    YY.textContent = dateYY;
    yyFunc(you);
});

function yyFunc(you) {
    let e = document.querySelectorAll('input')[3];
    if ( you.length !== 2) {
        information("Can't be blank!!", 2 , 'hsl(0, 100%, 66%)');
        e.style.border = '2px solid hsl(0, 100%, 66%)';
        checkingInfo.CardYY = false;
    } else {
        information("-", 2 , 'white');
        e.style.border = '2px solid 	hsl(249, 100%, 64%)';
        checkingInfo.CardYY = true;
    }
}

function numberFormat(n){
    let myNumber = '';
    if (n.length == 0) {
        myNumber='00';
    }
    if (n.length == 1) {
        myNumber = '0' + n;
    }
    if (n.length == 2) {
        myNumber = n;
    }
    return myNumber;
}

//--------------------------------------------------------

// Function CVC
var getCVC = document.getElementsByClassName('cvc')[0];
var CVC = document.getElementsByClassName('cvc-card')[0];
getCVC.addEventListener('input', e => {
    dataCVC = numberDigits(e.target.value);
    CVC.textContent = dataCVC;
    cvcFunc(e.target.value);
});
function cvcFunc(you) {
    let e = document.querySelectorAll('input')[4];
    if ( you.length != 3) {
        information("Can't be blank!!", 3 , 'hsl(0, 100%, 66%)');
        e.style.border = '2px solid hsl(0, 100%, 66%)';
        checkingInfo.CardCVC = false;
    } else {
        information("-", 3 , 'white');
        e.style.border = '2px solid 	hsl(249, 100%, 64%)';
        checkingInfo.CardCVC = true;
    }
}
function numberDigits(e) {
    let myNumber = '';
    if (e.length == 1) {
        myNumber = '00'+e;
    }
    if (e.length == 2) {
        myNumber = '0'+e;
    }
    if (e.length == 3) {
        myNumber =e;
    }
    if (e.length == 0) {
        myNumber = '000';
    }
    return myNumber;
}
//----------------------------------------------------------
var getForm = document.getElementsByClassName('form')[0];
var getConfirm = document.getElementsByClassName('thankYou')[0];
function cache() {
    if (checkingInfo.CardCVC == true && checkingInfo.CardCredit == true && checkingInfo.CardMM == true &&
        checkingInfo.CardYY == true && checkingInfo.CardName == true) {
        let cacheData = {
            CardName:name,
            CardCredit:cardNumber,
            CardMM:dateMM,
            CardYY:dateYY,
            CardCVC:dataCVC
        }
        localStorage.setItem('cache', JSON.stringify(cacheData));
    
        getForm.style.display = 'none';
        getConfirm.style.display = 'block';
    }
}

function myCache() {
    let data = JSON.parse(localStorage.getItem('cache'))
    console.log(data);
}


function reset() {
    getForm.style.display = 'block';
    getConfirm.style.display = 'none';
}

function information(text , loca, color) {
    danger[loca].textContent = text;
        danger[loca].style.color = color;
}
//----------------------------------------

let data = JSON.parse(localStorage.getItem('cache'));
if (localStorage.getItem('cache') !== null) {
    myName.textContent = data.CardName;
    getName.value = data.CardName;
    nameFunc(data.CardName);
name = data.CardName;
cardNumber = data.CardCredit;
dateMM = data.CardMM;
dateYY = data.CardYY;
dataCVC = data.CardCVC;

    myNumber.textContent= data.CardCredit;
    getNumber.value = data.CardCredit;
    numberFunc(data.CardCredit);

    MM.textContent = data.CardMM;
    getMM.value = data.CardMM;
    mmFunc(data.CardMM);

    YY.textContent = data.CardYY;
    getYY.value = data.CardYY;
    yyFunc(data.CardYY);

    CVC.textContent = data.CardCVC;
    getCVC.value = data.CardCVC;
    cvcFunc(data.CardCVC);
    
    getForm.style.display = 'none';
    getConfirm.style.display = 'block';
}