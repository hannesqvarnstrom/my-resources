//REMOVED JQUERY, WEIRD ISSUES?????
const machine = document.getElementsByClassName('output');
function makeShape() {
    let circumference = document.getElementsByName('circum').value;
    let shapeBtns = document.getElementsByName('shape');
    let colorBtns = document.getElementsByName('color');
    let shapeChoice = undefined;
    let colorChoice = undefined;
    for (let i = 0; i < shapeBtns.length; i++) {
        if (shapeBtns[i].checked) {
            shapeChoice = shapeBtns[i];
            break;
        }
    }
    for (let i = 0; i < colorBtns.length; i++) {
        if (colorBtns[i].checked) {
            colorChoice = colorBtns[i];
            break;
        }
    }
    //NÄSTA STEG - SKAPA NÅGOT FÖR FORMERNA??


    var newDiv = document.createElement('DIV');
    newDiv.style.backgroundColor = colorChoice.value; //kanske måste översätta lådans värde till en faktiskt färg???? skapa variabler för varje färg som fylls när lådan fylls??
    machine[0].appendChild(newDiv);

}