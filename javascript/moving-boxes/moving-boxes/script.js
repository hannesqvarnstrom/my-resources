$(document).ready(function () {
  let x, y
  const boxList = document.querySelectorAll('.box')
  const box_list = Array.from(boxList)
  var resetPos = [];
  box_list.forEach(box => resetPos.push(box.getBoundingClientRect()))
  var boxNumber = 0;
  function addBox() {
    let newDiv = document.createElement('DIV');
    boxNumber++;
    newDiv.classList.add('box');
    newDiv.classList.add('first_pos');
    newDiv.style.left = 25 + boxNumber * 10 + "%";
    newDiv.innerHTML = "<p> Object " + boxNumber + "</p>";
    document.body.appendChild(newDiv);
  }
  //SKAPA EVENTLISTENER FÖR DEN KOMMANDE KNAPPEN
  document.getElementById('addBoxButton').addEventListener('click', addBox);

  //const resetPos = [box_list[0].getBoundingClientRect(), box_list[1].getBoundingClientRect(), box_list[2].getBoundingClientRect(), box_list[3].getBoundingClientRect()]
  //make loop above for other amount of boxes. empty array - > fill with loop
  for (let i = 0; i < box_list.length; i++) {
    box_list[i].addEventListener('click', moveUpLeft)
  }
  // KOMMENTAR : om man resizar fönstret efter påbörjad animering fuckar positionerna upp... ajajaj
  let toggle = false
  let previousName = ''
  var restDivCoords = []
  const bodyTag = document.getElementsByTagName('body')[0]
  //THE FOLLOWING FUNCTION CONTROLS THE BOXES POSITION! ALL IN ONE FUNCTION! 
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

        //this.innerHTML = '<p>Back</p>'
      })

      bodyTag.classList.add('selectedBody')//these few rows just demonstrate how easy it is to change the styling and classes of elements by adding and removing classes
      this.classList.add('second_pos')
      this.classList.remove('first_pos')
      for (let i = 0; i < box_list.length; i++) {//this loop/animation moves all boxes NOT clicked (!==this) to a specific place. could be made more cool with like a function of their current pos or something idk
        if (box_list[i] !== this) {
          restDivCoords[i] = box_list[i].getBoundingClientRect()
          $(box_list[i]).animate({ top: '5px', left: '100%', opacity: '0' }, 300
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

  $('#expandSideBar').click(function () {
    $('#sidebar').animate({ width: 'toggle', display: 'content' }, 500)
  })

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
