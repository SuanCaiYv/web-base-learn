let choice = document.querySelector("#choice")
let button = document.querySelector("#button")
let img = document.querySelector("#output-img")

button.onclick = function() {
    let ch = -1
    if (choice.value === "0") {
        ch = 0
    } else if (choice.value === "1") {
        ch = 1
    }
    downloadImg(ch)
}

function downloadImg(choice) {
    let url = "http://127.0.0.1:8190/t2"
    if (choice === 0) {
        url += "/0"
    } else if (choice == 1) {
        url += "/1"
    }
    return fetch(url, {
        method: "GET",
        mode: "cors"
    })
    .then(resp => {
        if (!resp.ok) {
            throw new Error(`get an error: ${resp.status}`)
        } else {
            return resp.blob()
        }
    })
    .then(blob => {
        img.src = URL.createObjectURL(blob)
    })
    .catch(err => {
        console.log(err)
    })
}

let err1 = document.querySelector("#err1")
let wait1 = document.querySelector("#wait1")
let err2 = document.querySelector("#err2")
let wait2 = document.querySelector("#wait2")
let err3 = document.querySelector("#err3")
let wait3 = document.querySelector("#wait3")
let start = document.querySelector("#start")
let p = document.querySelector("#output-text")

let time = []
let flag = []

for (let i = 0; i < 3; ++ i) {
    time[i] = 0
}

for (let i = 0; i < 3; ++ i) {
    flag[i] = false
}

wait1.onclick = function() {
    time[0] = 3000
}

wait2.onclick = function() {
    time[1] = 1000
}

wait3.onclick = function() {
    time[2] = 2000
}

err1.onclick = function() {
    flag[0] = true
}

err2.onclick = function() {
    flag[1] = true
}

err3.onclick = function() {
    flag[2] = true
}

start.onclick = function() {
    let a = promise(flag[0], time[0], 1)
    let b = promise(flag[1], time[1], 2)
    let c = promise(flag[2], time[2], 3)
    Promise
    .all([a, b, c])
    .then(values => {
        p.textContent = values[0] + "," + values[1] + "," + values[2]
    })
    .catch(err => {
        p.textContent = err
    })
    // 在finally块中重置状态
    .finally(() => {
        for (let i = 0; i < 3; ++ i) {
            time[i] = 0
        }
        
        for (let i = 0; i < 3; ++ i) {
            flag[i] = false
        }
    })
}

// 专门生成Promise的函数
function promise(flag, time, idx) {
    if (flag) {
        // 调用reject()并传值，这个值会作为错误信息传递出去
        return new Promise((resolve, reject) => {
            reject("error" + idx)
        })
    } else {
        // 调用resolve()并传值，这个值会作为正确信息并传递出去
        // 名称无所谓，resolve/reject纯粹是比较通俗易懂的原因
        return new Promise((resolve, reject) => {
            console.log(time + " " + idx)
            // 这里我们用setTimeout()模拟耗时任务
            // 这个function() {}是必须的！
            setTimeout(function() {
                resolve("msg" + idx)
            }, time)
        })
    }
}
