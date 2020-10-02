var contactBut = document.getElementById('contactButton')
var conBox = document.getElementsByClassName('contactBox')[0]

contactBut.addEventListener('click', function () {
  conBox.classList.toggle('show')
})

contactBut.addEventListener('click', function () {
  conBox.style.animation = 'contactAnim 1s ease-out'
})
// NOTE TO SELF, OM DU VILL FÅ ANIMATIONEN ATT REVERSA VID NÄSTA KLICK, ANGE EN TIMER EFTER ANIMATIONSAVSLUT INNAN KLASSEN TAS BORT.
//ALTERNATIVT, AKTIVERA ETT 'MODE' SOM GÖR ATT ALLA KLICK SOM INTE ÄR PÅ LÄNKARNA STARTAR ANIMATION, TAR BORT KLASSEN 'show'.
//NÄR BOXEN ÄR UPPE, SÄNK LJUSSTYRKA PÅ RESTEN? HUR MAN GÖR?
