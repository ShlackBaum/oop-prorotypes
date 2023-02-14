class Good {
    constructor (id, name, description, sizes, price, available) {
    this.id = id;      
    this.name = name;       
    this.description = description;  
    this.sizes = sizes;        
    this.price = price;      
    this.available = available;  
    Good.instances.push(this);
}

    static instances = [];

    setAvailable (available) {
    this.available = available
    }
 }

 const good1 = new Good (1, "товар1", "d1", 10, 12, "1")
 const good2 = new Good (2, "товарчик2", "d2", 15, 18, "0")
 const good3 = new Good (3, "товарик3", "d3", 24, 29, "1")
 const good4 = new Good (4, "товарище4", "d4", 26, 35, "0")
 const good5 = new Good (5, "товарняк5", "d5", 28, 90, "1")
 const good6 = new Good (6, "товар6", "d6", 10, 12, "1")
 const good7 = new Good (7, "товарчик7", "d7", 15, 21, "0")
 const good8 = new Good (8, "товарик8", "d8", 24, 32, "1")
 const good9 = new Good (9, "товарище9", "d9", 26, 35, "0")
 const good10 = new Good (10, "товарняк10", "d10", 28, 90, "1")

 const all_goods = Good.instances

 class Goodslist {
    #goods = []
    constructor(goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        const availableGoods = this.#goods.filter(good => good.available == '1')
        const filteredGoods = availableGoods.filter(good => this.filter.test(good.name))
        console.log(this.sortPrice)
        let sortedGoods = undefined
        if (this.sortPrice == 1) {
            sortedGoods = filteredGoods.sort((n1,n2) => n2.price - n1.price)
        }
        if (this.sortPrice == 0) {
            sortedGoods = filteredGoods.sort((n2,n1) => n2.price - n1.price)
        }
        console.log(sortedGoods)
    }

    remove(id) {
        let newGoods = this.#goods.filter(good => good.id !== id)
        this.#goods = newGoods
        // console.log(this.#goods)
    }

    add(id, name, description, sizes, price, available) {
        this.#goods.push({id:id, name:name, description:description, sizes:sizes, price:price, available:available})
        
    }
 }

let createdGoodsList = new Goodslist([], /la/i, 1, 1);
createdGoodsList.add("21","gla21","gla21","21","21","1")
createdGoodsList.add("22","glo22","gla22","22","22","1")
createdGoodsList.add("23","glu23","gla23","23","23","1")
createdGoodsList.add("24","glu24","gla24","24","24","0")
createdGoodsList.add("25","glo25","gla25","25","25","1")
createdGoodsList.add("26","gla26","gla26","26","26","1")
createdGoodsList.add("27","glo27","gla27","27","27","1")
createdGoodsList.add("28","glu28","gla28","28","28","0")
createdGoodsList.add("29","glu29","gla29","29","29","1")
createdGoodsList.add("30","gla30","gla30","30","30","1")

// Использовать каждый метод для GoodsList с использованием разных фильтраций и сортировок и вывести в консоль отфильтрованный и отсортированный список
createdGoodsList.remove('21')
createdGoodsList.remove('25')
createdGoodsList.add("100","gla100","gla100","100","100","1")
createdGoodsList.add("200","glo200","glo200","200","200","1")
createdGoodsList.list



class BasketGood extends Good {
    constructor (id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available)
        this.amount = amount
        BasketGood.instances.push(this);
    }
    static instances = [];
}

let newBasketGood = new BasketGood(1,1,1,1,1,"yes",1)
let newBasketGood2 = new BasketGood(2,2,2,2,2,"yes",2)
let newBasketGood3 = new BasketGood(3,3,3,3,3,"yes",3)
let newBasketGood4 = new BasketGood(4,4,4,4,4,"yes",4)
let allBasketGoods = BasketGood.instances

class Basket {
    constructor(goods) {
        this.goods = goods
    }

    add(good, amount) {
        let searchableGood = this.goods.find(goody => goody.id === good); /Либо False либо True/
        if (searchableGood == undefined) {
            let searchableInAllGoods = Good.instances.find(goody => goody.id === good);
            this.goods.push(searchableInAllGoods)
            console.log(this.goods)
        }
        if (searchableGood !== undefined) {
            searchableGood.amount = amount
        }
    }

    remove(good, amount) {
        let searchableGood = this.goods.find(goody => goody.id === good); /Либо False либо True/
        if (searchableGood == undefined) {
            console.log("Такого товара нет в корзине")
        }
        if (searchableGood.amount - amount < 0) {
            console.log("Такой товар есть, но его количество в корзине меньше, чем количество товара на удаление")
            }
        if (searchableGood.amount - amount > 0) {
            searchableGood.amount -= amount
            console.log(searchableGood)
            }
        if (searchableGood !== undefined) {
            if (searchableGood.amount - amount == 0) {
            this.goods = this.goods.filter(goody => goody.id !== good);
            }
        
        }
    }

    clear() {
        this.goods = []
    }

    get totalAmount() {
        console.log(this.goods.reduce((max, good) => max + good.amount, 0))
    }

    get totalSum() {
        console.log(this.goods.reduce((max, good) => max + good.price*good.amount, 0))
    }

    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available == "yes")
    }
}

let ourBasket = new Basket(allBasketGoods)
ourBasket.removeUnavailable()

// Выведите значения общих суммы и количества товаров в корзине.

console.log("Общее количество товаров в корзине")
ourBasket.totalAmount
console.log("Общая стоимость товаров в корзине")
ourBasket.totalSum
