let range = document.querySelector("#range")
let rangeOut = document.querySelector("#range-out")
range.oninput = function() {
    rangeOut.textContent = range.value
}