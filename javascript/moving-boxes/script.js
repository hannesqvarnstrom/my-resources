$(document).ready(function () {
  let x, y
  var box_list = [];
  var resetPos = [];
  document.getElementById('addBoxButton').addEventListener('click', addBox);
  let toggle = false
  let previousName = ''
  var restDivCoords = []
  var boxRows = 1;
  var rowReset = 0;
  const bodyTag = document.getElementsByTagName('body')[0]
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
  var boxNumber = 0;
  function addBox() {
    if (rowReset == 9) {
      boxRows++;
      rowReset = 0;
    }
    let newDiv = document.createElement('DIV');
    boxNumber++;
    newDiv.classList.add('box');
    newDiv.classList.add('first_pos');
    newDiv.style.top = 30 + (boxRows - 1) * 10 + "%";
    newDiv.style.left = 5 + rowReset * 10 + "%";
    newDiv.innerHTML = "<p> Object " + boxNumber + "</p>";
    document.body.appendChild(newDiv);
    newDiv.addEventListener('click', moveUpLeft);
    newDiv.addEventListener('contextmenu', function (ev) {//THIS ENABLES BOXES TO BE 'REMOVED', HOWEVER NEW BOXES DONT GO IN THEIR PLACE. THEIR SPACE STAYS EMPTY. FIX?
      newDiv.parentNode.removeChild(newDiv); // create global attribute that is array, store deleted boxnumbers there and let that be the first place that newDiv.innerhtml goes to name stuff, also the first place the style.placing of each item happens
      ev.preventDefault(); //ALSO this breaks the state-2 of the boxes, the left-click-grow one. that is a problem. fixable with boolean? maybe not worth doing at all. 
      //box-number --? becomes rather weird, right? 
      return false;
    }, false)
    box_list.push(newDiv);
    resetPos.push(newDiv.getBoundingClientRect());
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
