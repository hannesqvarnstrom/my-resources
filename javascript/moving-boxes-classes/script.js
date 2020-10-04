$(document).ready(function () {
  document.getElementById('addBoxButton').addEventListener('click', addBox);
  //global variables
  let x, y
  var box_list = [];
  var resetPos = [];
  let toggle = false
  let previousName = ''
  var restDivCoords = []
  var boxRows = 1;
  var rowReset = 0;
  var boxNumber = 0;
  class BoxObject {
    constructor(row, column, name) {
      this.top = 30 + (row - 1) * 10;
      this.left = 5 + column * 10;
      this.number = name;
    }
    createDiv() {
      let newDiv = document.createElement('DIV');
      newDiv.classList.add('box', 'first_pos');
      newDiv.style.top = this.top + "%";
      newDiv.style.left = this.left + "%";
      newDiv.innerHTML = "<p>Object " + this.number + "</p>";
      newDiv.addEventListener('click', moveUpLeft);
      document.body.appendChild(newDiv);
      box_list.push(newDiv);
      resetPos.push(newDiv.getBoundingClientRect());
    }
  }

  const bodyTag = document.getElementsByTagName('body')[0]//not necessary for function to move boxes, changes color of body only
  function moveUpLeft() {
    if (!toggle) {
      for (let i = 0; i < box_list.length; i++) {
        if (box_list[i] !== this) {
          box_list[i].removeEventListener('click', moveUpLeft)
        }
      }
      let coord = this.getBoundingClientRect()
      x = coord.left
      y = coord.top
      previousName = this.getElementsByTagName('p')[0].innerHTML

      $(this).animate({ top: ['100px', 'swing'], left: ['100px', 'swing'], fontSize: '2.5em', width: '200px' }, 750, function () { //this thing, the function statement after the millisecond animation value, is a function that fires after the animation completes. so you can chain animations after one another!
        $(this.getElementsByTagName('p')).fadeOut(function () {
          this.innerHTML = 'Back'
          $(this).fadeIn()
        })
      })
      var topPxStr;
      bodyTag.classList.add('selectedBody')//these few rows just demonstrate how easy it is to change the styling and classes of elements by adding and removing classes
      this.classList.add('second_pos')
      this.classList.remove('first_pos')
      for (let i = 0; i < box_list.length; i++) {//this loop/animation moves all boxes NOT clicked (!==this) to a specific place. could be made more cool with like a function of their current pos or something idk
        if (box_list[i] !== this) {
          restDivCoords[i] = box_list[i].getBoundingClientRect()
          topPxStr = 10 + (i * 5) + "px"; //This variable can be changed to spread out or change the behaviour of the boxes during state-change
          $(box_list[i]).animate({ top: topPxStr, left: '100%', opacity: '0' }, 300
          )
        }
      }
      toggle = true
    } else {
      $(this).animate({ top: [y, 'swing'], left: [x, 'swing'], fontSize: '1.5em', width: '150px' }, 600, function () { //this is if you're in the 'secondpos' mode, aka the boolean outside the function is switched 
        $(this.getElementsByTagName('p')).fadeOut('fast', function () {
          this.innerHTML = previousName
          $(this).fadeIn()
        })
        for (let i = 0; i < box_list.length; i++) {
          box_list[i].addEventListener('click', moveUpLeft)
        }
      })
      this.classList.add('first_pos')
      this.classList.remove('second_pos')
      for (let i = 0; i < box_list.length; i++) {
        if (box_list[i] !== this) { // doesnt matter
          $(box_list[i]).animate({ top: restDivCoords[i].top, left: restDivCoords[i].left, opacity: 1 }, 500)
        }
      }
      bodyTag.classList.remove('selectedBody')
      toggle = false
    }
  }
  function addBox() {
    if (rowReset == 9) {
      boxRows++;
      rowReset = 0;
    }
    boxNumber++;
    let boxObject = new BoxObject(boxRows, rowReset, boxNumber);
    boxObject.createDiv();
    rowReset++;
  }

  document.querySelector('#randomButton').addEventListener('click', function () {
    for (let i = 0; i < box_list.length; i++) {
      $(box_list[i]).animate({ top: (Math.random() * 2000), left: (Math.random() * 2000) }, 400)
    }
  })



  $('#resetButton').click(function () {
    for (let i = 0; i < box_list.length; i++) {
      $(box_list[i]).animate({ top: resetPos[i].top + 'px', left: resetPos[i].left + 'px' }, 1000)
    }
  })

})
