var productData = [];

console.log("fetching catalog");
fetch('https://rocapi.jake.how/shop/catalog')
    .then(response => response.json())
    .then(data => productData = data)
    .finally(() => populateShop());

function populateShop() {
    var template = document.querySelector("#product-template").innerHTML;
    var templateScript = Handlebars.compile(template);

    console.log(productData);
    if(productData.length == 0) {
        return;
    }

    // Remove the error message that is displayed in place of an empty catalog
    document.querySelector(".catalog-empty").remove();

    productData.forEach(product => {
        // Hackily set the icon manually, I'm so good
        product.icon = window.__SHOPPING_CART__.items.includes(product.id) ? "fa-circle-check" : "fa-cart-plus";

        var html = templateScript(product);
        var element = document.createElement("div");
        element.innerHTML = html;

        document.querySelector(".products").appendChild(element);
    });
}

function toggleCart(button, itemId) {
    if(window.__SHOPPING_CART__.items.includes(itemId)) {
        window.__SHOPPING_CART__.removeItem(itemId);
        button.firstChild.classList.remove("fa-circle-check");
        button.firstChild.classList.add("fa-cart-plus");
    }
    else {
        window.__SHOPPING_CART__.addItem(itemId);
        button.firstChild.classList.remove("fa-cart-plus");
        button.firstChild.classList.add("fa-circle-check");
    }
}