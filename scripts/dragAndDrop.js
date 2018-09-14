function DHandlers() {
    console.log('AAAAA')
    let coffeeImages = document.getElementsByClassName("productarticlewide");
console.log(coffeeImages)
    let shoppingCartDropZone = document.getElementById("shoppingcart");

    let shoppingCart = document.querySelectorAll("#shoppingcart ul")[0];

    for(let i = 0;  i < coffeeImages.length; i++) {
        coffeeImages[i].addEventListener("dragstart", function (event) {
            event.dataTransfer.effectAllowed = 'copy';
            event.dataTransfer.setData("Text", this.getAttribute("id"));
        }, false);
    }

    let Cart = (function() {
        this.coffees = new Array();
    });

    let Coffee = (function(id, price) {
        this.coffeeId = id;
        this.price = price;
    });

    //contains contents from local storage
    let currentCart = null;

    currentCart = JSON.parse(localStorage.getItem('cart'));

    if (!currentCart) {
        createEmptyCart();
    }

    updateShoppingCartUI();
    
    //add a new function to the currentCart object
    currentCart.addCoffee = function(coffee) {
        currentCart.coffees.push(coffee);
        localStorage.setItem('cart', JSON.stringify(currentCart));
    };


    shoppingCartDropZone.addEventListener("dragover", function(event) {
        event.preventDefault();
        event.dataTranser.dropEffect = "copy";
    }, false);

    shoppingCartDropZone.addEventListener("drop", function(event) {
        event.stopPropagation();
        event.dataTransfer.dropEffect = "copy";

        let coffeeId = event.dataTransfer.getData("text");
        let element = document.getElementById(coffeeId);

        addCoffeeToShoppingCart(element, coffeeId);
        event.stopPropagation;

    }, false);

        function addCoffeeToShoppingCart(item, id) {
        let price = item.getAttribute("data-price");

        let coffee = new Coffee(id, price);
        currentCart.addCoffee(coffee);

        updateShoppingCartUI();
        
    }

        function createEmptyCart() {
            localStorage.clear();
            localStorage.setItem("cart", JSON.stringify(new Cart()));
            currentCart = JSON.parse(localStorage.getItem("cart"));
        }
        
        function updateShoppingCartUI() {
            shoppingCart.innerHTML = "";
            for(let i = 0; i < currentCart.coffees.length; i++) {
                let listElement = document.createElement("li");
                listElement.innerHTML = currentCart.coffees[i].coffeeId + " " + currentCart.coffees[i].price;
                shoppingCart.appendChild(listElement);
            }
        }
}