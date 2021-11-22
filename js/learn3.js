let name1 = document.getElementById("name1")
let age1 = document.getElementById("age1")
let submit1 = document.getElementById("submit1")
let resp1 = document.getElementById("resp1")

// 其实这儿也算一个回调，当按钮被点击会触发回调函数的执行
submit1.onclick = function () {
    let input = {
        "name": name1.value,
        "age": age1.value
    }
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "http://127.0.0.1:8190/t1", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    // 这里使用回调异步，当结果可用，会自动调用这个函数
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                resp1.textContent = this.responseText
            } else {
                console.error(xhr.statusText);
            }
        }
    }
    xhr.send(JSON.stringify(input))
}

let name2 = document.getElementById("name2")
let age2 = document.getElementById("age2")
let submit2 = document.getElementById("submit2")
let resp2 = document.getElementById("resp2")

submit2.onclick = function() {
    let input = {
        "name": name2.value,
        "age": age2.value
    }
    fetch("http://127.0.0.1:8190/t1", {
        body: JSON.stringify(input),
        headers: {
            'Content-Type': "application/json"
        },
        method: 'POST',
        mode: 'cors'
    })
    .then(resp => {
        return resp.json()
    })
    .then(data => {
        resp2.textContent = JSON.stringify(data)
    })
    console.log('run')
}