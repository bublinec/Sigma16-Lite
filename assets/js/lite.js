function changeColor () {
    var color_input = document.querySelector("input[type=color]")
    var new_color = color_input.value
    document.querySelector("body").style.setProperty('--main', new_color);
}
