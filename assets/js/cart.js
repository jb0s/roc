var productData = [];

console.log("fetching catalog");
fetch('https://rocapi.jake.how/shop/catalog')
    .then(response => response.json())
    .then(data => productData = data)
    .finally(() => populateShop());

function populateShop() {
    var template = document.querySelector("#product-template").innerHTML;
    var templateScript = Handlebars.compile(template);
    let productsInCart = productData.filter(x => __SHOPPING_CART__.items.includes(x.id));
    if(productsInCart.length == 0 || productData.length == 0) {
        updateCheckout();
        return;
    }
    
    // Remove the error message that is displayed in place of an empty catalog
    document.querySelector(".catalog-empty").style.display = "none";
    
    // Populate product list
    var duration = 0;
    productsInCart.forEach(product => {
        // Hackily set the icon manually, I'm so good
        product.icon = window.__SHOPPING_CART__.items.includes(product.id) ? "fa-circle-xmark" : "fa-cart-plus";
            
        var html = templateScript(product);
        var element = document.createElement("div");
        element.innerHTML = html;
        
        document.querySelector(".products").appendChild(element);

        duration += 60;
        animateTile(product.id, duration);
    });

    updateCheckout();
}

function removeFromCart(id) {
    window.__SHOPPING_CART__.removeItem(id);
    document.querySelector(`#${id}`).parentElement.remove();
    updateCheckout();

    if(__SHOPPING_CART__.items.length == 0) {
        document.querySelector(".catalog-empty").style.display = "block";
    }
}

function updateCheckout() {
    let checkoutPanel = document.querySelector(".checkout");
    checkoutPanel.style.display = __SHOPPING_CART__.items.length > 0 ? "flex" : "none";

    let totalProductLabel = document.querySelector(".checkout .left #totalProductLabel");
    let totalPriceLabel = document.querySelector(".checkout .left #totalPriceLabel");

    totalProductLabel.innerHTML = `Totale producten: ${__SHOPPING_CART__.items.length}`;
    totalPriceLabel.innerHTML = `Totaalbedrag: €${getTotalPrice().toString().replace(".", ",")} ${__SHOPPING_CART__.items.length == productData.length ? "(Dat is heel veel geld!!)" : ""}`;
}

function getTotalPrice() {
    let totalPrice = 0.0;
    __SHOPPING_CART__.items.forEach(x => {
        let p = productData.filter(y => y.id == x)[0];
        totalPrice += parseFloat(p.price.replace(",", "."));
    });

    return totalPrice;
}

function animateTile(id, wait) {
    var tile = document.getElementById(id);

    tile.style.opacity = 0;
    setTimeout(() => {
        tile.style.opacity = 1;
        tile.style.animationName = "shopProductFadeIn";
    }, wait);
}