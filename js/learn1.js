let num = Math.floor(Math.random() * 100) + 1

const inputs = document.getElementById('inputs')
const lastResult = document.getElementById('lastResult')
const tips = document.getElementById('tips')

const confirm = document.getElementById('confirm')
const input = document.getElementById('input')

let count = 1

function checkGuess() {
    let guessNum = Number(input.value)
    console.log(num)
    if (count === 1) {
        inputs.textContent = '上次猜的数'
    }
    count += 1
    inputs.textContent += (' ' + guessNum)
    if (guessNum == num) {
        lastResult.textContent = 'Got that!'
        lastResult.style.backgroundColor = 'green'
    } else if (count === 10) {
        lastResult.textContent = '游戏结束'
    } else {
        lastResult.textContent = '猜错咯！'
        lastResult.style.backgroundColor = 'red'
        if (guessNum < num) {
            tips.textContent = '尝试大一点的数'
        } else {
            tips.textContent = '尝试小一点的数'
        }
    }
    input.textContent = ''
    input.focus()
}

confirm.addEventListener('click', checkGuess)