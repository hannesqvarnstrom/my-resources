//first we initialize box_list, to keep track of our shapes
let box_list = [];
let menu_items = document.getElementsByClassName("menuitem");
//then we create global variables to keep track of how many shapes
let boxRows = 1;
let rowReset = 0;
let boxNumber = 0;
//then we create a class for our shapes
class Sprite {
  constructor(circ, shape, clr, row, col, num) {
    this.top = 20 + (row - 1) * 20 + "%"; //check the exact px amounts that make sense
    this.left = 5 + col * 20 + "%"; //for this too
    this.number = num;
    this.circumference = circ;
    this.shape = shape;
    this.colour = clr;
  }
  createSprite() {
    let newShape = document.createElement("DIV");
    newShape.classList.add("box");
    newShape.style.top = this.top;
    newShape.style.left = this.left;
    newShape.innerHTML = "<p>Object " + this.number + "</p>";
    if (this.shape.id == "triangle-button") {
      //this is when we construct the triangle
      //in this experiment, this does not work. this is because of the faulty method of triangle making
      newShape.style.width = "0px";
      newShape.style.height = "0px";
      newShape.style.borderLeft = this.circumference / 2 + "px solid white";
      newShape.style.borderRight = this.circumference / 2 + "px solid white";
      newShape.style.borderBottom =
        this.circumference + "px solid " + this.colour.value; //räcker hela vägen in?
    } else {
      newShape.style.width = this.circumference + "px";
      newShape.style.height = this.circumference + "px";
      switch (this.shape.id) {
        case "circle-button":
          newShape.style.borderRadius = "50%";
          break;
        case "cube-button":
          break;
        default:
          break;
      }
      newShape.style.backgroundColor = this.colour.value; //rätt plats? VALUE?
    }
    document.body.appendChild(newShape); //if you want the shapes in a container, use this row
    box_list.push(newShape);
    newShape.addEventListener("click", function () {
      for (let i = 0; i < box_list.length; i++) {
        //this is the loop that controls which shape is movable at the moment
        if (box_list[i].classList.contains("active-sprite")) {
          box_list[i].classList.remove("active-sprite");
        }
      }
      this.classList.toggle("active-sprite");
    });
  }
}
//this is to open sub-menu for creation
document
  .getElementsByClassName("createShape")[0]
  .addEventListener("click", function () {
    for (let i = 0; i < menu_items.length; i++) {
      menu_items[i].classList.toggle("hidden");
    }
    document.getElementById("creationList").classList.toggle("hidden");
  });

document.getElementById("submit-btn").addEventListener("click", function () {
  for (let i = 0; i < menu_items.length; i++) {
    menu_items[i].classList.toggle("hidden"); //for 'showing' all menu items next time you click open menu
  }
  document.getElementById("menu").classList.toggle("shown"); //hide menu to show shapes
  document.getElementById("creationList").classList.toggle("hidden"); //remove the creationList
  if (rowReset == 9) {
    // this can be changed to fit how many columns is needed
    boxRows++;
    rowReset = 0;
  }
  boxNumber++;
  let circumference = document.getElementsByName("circum")[0].value;
  let shapeBtns = document.getElementsByName("shape");
  let colorBtns = document.getElementsByName("color");
  let shapeChoice;
  let colorChoice;
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
  let NewShape = new Sprite(
    circumference,
    shapeChoice,
    colorChoice,
    boxRows,
    rowReset,
    boxNumber
  );
  NewShape.createSprite();
  rowReset++;
});

//this is to close the menu and reset it. it is supposed to be clear that that's what it does
document.getElementById("closeMenu").addEventListener("click", function () {
  document.getElementById("menu").classList.toggle("shown");
  document.getElementById("creationList").classList.toggle("hidden");
  for (let i = 0; i < menu_items.length; i++) {
    menu_items[i].classList.toggle("hidden");
  }
});

//this toggles the menu, but DOESNT reset it!! maybe add a back button?
document.getElementById("menu-button").addEventListener("click", function () {
  document.getElementById("menu").classList.toggle("shown");
  //document.removeEventListener('keydown', keyCheck()) //FÖR ATT TOGGLA OM KNAPPTRYCK SKA SYNAS?
});
//
//
document
  .getElementsByClassName("deleteShape")[0]
  .addEventListener("click", function () {
    for (let i = 0; i < box_list.length; i++) {
      box_list[i].addEventListener("click", DeletePrompt);
      box_list[i].classList.add("glow");
    }
  });

function DeletePrompt() {
  if (confirm("Are you sure you want to delete this item?")) {
    this.parentNode.removeChild(this);
    let index = box_list.indexOf(this);
    box_list.splice(index, 1); //
    for (let i = 0; i < box_list.length; i++) {
      box_list[i].classList.remove("glow");
      box_list[i].removeEventListener("click", DeletePrompt);
    }
  } else {
    for (let i = 0; i < box_list.length; i++) {
      box_list[i].classList.remove("glow");
      box_list[i].removeEventListener("click", DeletePrompt);
    }

    return;
  }
}

//this is the eventListener that takes your input during movement. it currently fucks with your scrolling, which is not so good
document.addEventListener("keydown", function keyCheck(event) {
  // event.preventDefault()
  const key = event.key;
  let activeSprite = document.getElementsByClassName("active-sprite")[0];
  if (activeSprite !== undefined) {
    let position = activeSprite.getBoundingClientRect();

    //select active box
    //*here*
    //
    switch (key) {
      case "ArrowLeft":
        activeSprite.style.left = position.x - 100 + "px";
        break;
      case "ArrowUp":
        activeSprite.style.top = position.y - 100 + "px";
        break;
      case "ArrowRight":
        activeSprite.style.left = position.x + 100 + "px";
        break;
      case "ArrowDown":
        activeSprite.style.top = position.y + 100 + "px";
        break;
      default:
        break;
    }
    position = activeSprite.getBoundingClientRect();
  } //blir problem?????
});
