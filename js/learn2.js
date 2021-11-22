// 创建对象的常见方法

// 直接创建
let book1 = {
    name: "JavaScript",
    price: 78.9,
    toString: function(prefix) {
        return prefix + ": " + this.name + ", " + this.price
    }
}

let p1 = document.getElementById("id1")
p1.textContent = book1.toString("Display")

// 函数创建
function createBook(name, price) {
    let book = {}
    book.name = name
    book.price = price
    book.toString = function(prefix) {
        return prefix + ": " + this.name + ", " + this.price
    }
    return book
}

let book2 = createBook("C++", 70.3)

let p2 = document.getElementById("id2")
p2.textContent = book2.toString("Display")

// 定义一个类并创建
class Book {
    constructor(name, price) {
        this.name = name
        this.price = price
        this.toString = function (prefix) {
            return prefix + ": " + this.name + ", " + this.price
        }
    }
}

// 需要使用new关键字
let book3 = new Book("Java", 68.9)

let p3 = document.getElementById("id3")
p3.textContent = book3.toString("Display")

// 对象克隆
let book4 = Object.create(book3)

let p4 = document.getElementById("id4")
p4.textContent = book4.toString("Display")