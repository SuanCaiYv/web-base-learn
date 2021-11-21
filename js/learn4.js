let start = document.getElementById("start")
let pause = document.getElementById("pause")
let reset = document.getElementById("reset")
let interval = document.getElementById("interval")
let number = document.getElementById("number")
let confirm = document.getElementById("confirm")
let output = document.getElementById("output")

let startTime = 0

start.onclick = function() {
    startTime = new Date().valueOf()
    output.textContent = "计时开始"
}

pause.onclick = function() {
    let t = new Date().valueOf() - startTime
    // 处理时区
    t -= 8 * 60 * 60 * 1000
    let time = new Date(t)
    let str = output.textContent
    str += "\r\n"
    str += format(time.getHours(), 2) + ":" + format(time.getMinutes(), 2) + ":" + format(time.getSeconds(), 2) + "." + format(time.getMilliseconds(), 4)
    output.textContent = str
}

confirm.onclick = function() {
    let now = new Date()
    output.textContent = "现在是: " + format(now.getHours(), 2) + ":" + format(now.getMinutes(), 2) + ":" + format(now.getSeconds(), 2) + "." + format(now.getMilliseconds(), 4)
    let val = number.value
    setTimeout(function() {
        let now = new Date()
        let text = "时间间隔已到，现在是: " + format(now.getHours(), 2) + ":" + format(now.getMinutes(), 2) + ":" + format(now.getSeconds(), 2) + "." + format(now.getMilliseconds(), 4)
        let tmp = output.textContent
        tmp += "\r\n"
        tmp += text
        output.textContent = tmp
    }, val)
}

reset.onclick = function() {
    startTime = 0
    output.textContent = ""
}

function format(val, size) {
    let tmp = "00" + val
    return tmp.substr(tmp.length - size)
}
