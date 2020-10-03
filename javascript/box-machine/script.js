//REMOVED JQUERY, WEIRD ISSUES?????
$(document).ready(function () {

    const machine = document.getElementsByClassName('output');
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', makeShape)
    function makeShape() {
        let circumference = document.getElementsByName('circum')[0].value; //value ger inte värdet?
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
        var newDiv = document.createElement('DIV');
        if (shapeChoice.id == "triangle-button") {
            newDiv.style.width = "0 px";
            newDiv.style.height = "0 px";
            newDiv.style.borderLeft = circumference / 2 + "px solid lime";
            newDiv.style.borderRight = circumference / 2 + "px solid lime";
            newDiv.style.borderBottom = circumference + "px solid " + colorChoice.value;
        } else {
            newDiv.style.width = circumference + "px";
            newDiv.style.height = circumference + "px";
            switch (shapeChoice.id) {
                case "circle-button":
                    newDiv.style.borderRadius = "50%"
                    break;
                case "cube-button":
                    break;
                default:
                    break;
            }
        }
        newDiv.style.backgroundColor = colorChoice.value; //kanske måste översätta lådans värde till en faktiskt färg???? skapa variabler för varje färg som fylls när lådan fylls??
        machine[0].appendChild(newDiv);

    }
})