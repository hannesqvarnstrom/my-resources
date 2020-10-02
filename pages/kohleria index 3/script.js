$(document).ready(function () {
  var contactBut = document.getElementById('contactButton')
  var conBox = document.getElementsByClassName('contactBox')[0]
  //contactBut.addEventListener('click', function () {
  //  conBox.classList.toggle('show')
  //})
  $('#contactButton').click(function () {
    $('.contactBox').fadeIn(1000)
  })
  $('.closeWindow').click(function () {
    $('.contactBox').fadeOut(500)}

  )
  // contactBut.addEventListener('click', function () {
  //   conBox.style.animation = 'contactAnim 1s ease'
  // })
  // NOTE TO SELF, OM DU VILL FÅ ANIMATIONEN ATT REVERSA VID NÄSTA KLICK, ANGE EN TIMER EFTER ANIMATIONSAVSLUT INNAN KLASSEN TAS BORT.
  //  ALTERNATIVT, AKTIVERA ETT 'MODE' SOM GÖR ATT ALLA KLICK SOM INTE ÄR PÅ LÄNKARNA STARTAR ANIMATION, TAR BORT KLASSEN 'show'.
  //  NÄR BOXEN ÄR UPPE, SÄNK LJUSSTYRKA PÅ RESTEN? HUR MAN GÖR?
  const menufromDoc = document.querySelectorAll('.menu-button')
  const menuList = Array.from(menufromDoc)
  const header = document.querySelector('.header')
  const content = document.querySelectorAll('.content')
  const menuDiv = document.querySelector('.menu')
  var savedName = ''
  var currentToggle = true

  function isolateContent () {
    if (currentToggle) {
      savedName = this.innerHTML
    }
    for (let i = 0; i < menuList.length; i++) {
      if (menuList[i] !== this) {
        menuList[i].classList.toggle('hide')
      }
    }
    this.classList.toggle('currentPage')
    header.classList.toggle('hide')
    switch (savedName) {
      case 'About': content[0].classList.toggle('show')
        break
      case 'Species': content[1].classList.toggle('show')
        break
    }
    // content.classList.toggle('show')
    menuDiv.classList.toggle('currentPageDiv')// disabled in css, can enable for div action//
    if (this.innerHTML !== 'Back') {
      this.innerHTML = 'Back'
      currentToggle = false
    } else {
      this.innerHTML = savedName
      currentToggle = true
    }
  }
  for (let i = 0; i < menuList.length; i++) {
    menuList[i].addEventListener('click', isolateContent)
  }
})
