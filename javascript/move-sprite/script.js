var sprite = document.getElementById('sprite')
var position = sprite.getBoundingClientRect()
sprite.addEventListener('click', function () {
    sprite.style.top = position.y + 25 + "px"
    position = sprite.getBoundingClientRect()
})
document.addEventListener('keydown', function (event) {
    event.preventDefault()
    const key = event.key
    switch (key) {
        case "ArrowLeft":
            sprite.style.left = position.x - 40 + "px"
            break
        case "ArrowUp":
            sprite.style.top = position.y - 40 + "px"
            break
        case "ArrowRight":
            sprite.style.left = position.x + 40 + "px"
            break
        case "ArrowDown":
            sprite.style.top = position.y + 40 + "px"
            break
        case "p":
            document.getElementById('menu').classList.toggle('shown')
        default:
            break;
    }
    position = sprite.getBoundingClientRect()
})



