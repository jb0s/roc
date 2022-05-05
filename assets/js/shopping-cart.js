window.__SHOPPING_CART__ = {
    items: [],
    addItem: function(itemId) {
        this.items.push(itemId);
        this.refreshCartButton();
        document.cookie = `CART=${JSON.stringify(this.items)}`;

        console.log(`added ${itemId} to shopping cart`);
    },
    removeItem: function(itemId) {
        this.items.splice(this.items.indexOf(itemId), 1);
        this.refreshCartButton();
        document.cookie = `CART=${JSON.stringify(this.items)}`;

        console.log(`removed ${itemId} to shopping cart`);
    },
    refreshCartButton: function() {
        document.querySelector("#cart-count").innerHTML = this.items.length;
    }
}

var cartData = getCookie("CART");
if(cartData === undefined) {
    console.log("cart data is undefined, either first time visitor or user is accessing locally which disables cookies.");
    document.cookie = "CART=[]";
}
else {
    window.__SHOPPING_CART__.items = JSON.parse(cartData);
    window.__SHOPPING_CART__.refreshCartButton();
}

function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return match[2];
    }
}