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

        function addCoffeeToShoppingCart(item, id) {
            let html = id + " " + item.getAttribute("data-price");
            var listElement = document.createElement('li');
            listElement.innerHTML = html;
            shoppingCart.appendChild(listElement);
        }
    }, false);
}