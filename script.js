
// SHOPPING CART 
let cartItems = [];
let cartTotalPrice = 0;

function addToCart(itemName, itemPrice) {
    cartItems.push({ name: itemName, price: itemPrice });
    cartTotalPrice += itemPrice;
    document.getElementById("cart-count").textContent = cartItems.length;
    openCart(); 
}

function openCart() {
    let cartList = document.getElementById("cart-items-list");
    cartList.innerHTML = ""; 
    
    for (let i = 0; i < cartItems.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = "<span>" + cartItems[i].name + "</span> <span>R" + cartItems[i].price.toFixed(2) + "</span>";
        cartList.appendChild(li);
    }
    
    document.querySelector('input[value="collect"]').checked = true;
    updateDeliveryText(); 

    document.getElementById("cartModal").style.display = "block";
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

function clearCart() {
    cartItems = [];
    cartTotalPrice = 0;
    document.getElementById("cart-count").textContent = "0";
    document.getElementById("deliveryAddress").value = "";
    closeCart();
    alert("Cart cleared successfully!");
}

// DELIVERY LOGIC AND FREE DELIVERY
function updateDeliveryText() {
    let deliverySelected = document.querySelector('input[name="deliveryMethod"]:checked').value;
    let addressBox = document.getElementById("address-container");
    let priceText = document.getElementById("cart-total-price");
    
    if (deliverySelected === "deliver") {
        addressBox.style.display = "block";
        
        let deliveryAreaDropdown = document.getElementById("deliveryArea");
        let deliveryFee = parseFloat(deliveryAreaDropdown.value);
        
        if (cartTotalPrice >= 1000) {
            priceText.textContent = "Total: R" + cartTotalPrice.toFixed(2) + " (🎉 FREE Delivery!)";
            priceText.style.color = "green";
        } else {
            let newTotal = cartTotalPrice + deliveryFee;
            priceText.textContent = "Total: R" + newTotal.toFixed(2) + " (incl. R" + deliveryFee.toFixed(2) + " Delivery)";
            priceText.style.color = "#FF6600"; 
        }
        
    } else {
        addressBox.style.display = "none";
        priceText.textContent = "Total: R" + cartTotalPrice.toFixed(2);
        priceText.style.color = "#FF6600"; 
    }
}

// PLACE ORDER LOGIC
function placeOrder() {
    if (cartItems.length === 0) {
        alert("Your cart is empty! Please add some items first.");
        return;
    }

    let deliverySelected = document.querySelector('input[name="deliveryMethod"]:checked').value;
    let addressText = document.getElementById("deliveryAddress").value.trim();

    if (deliverySelected === "deliver" && addressText === "") {
        alert("Please enter your delivery address before placing the order.");
        return; 
    }

    alert("✅ Order Placed Successfully!\n\nThank you for shopping at Gogas Stationery.");
    clearCart();
}

// DYNAMIC SEARCH 
function filterProducts() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('product-card');

    for (let i = 0; i < cards.length; i++) {
        let productName = cards[i].getAttribute('data-name');
        if (productName.includes(input)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// GALLERY 
function openLightbox(imageSrc) {
    document.getElementById("lightbox-img").src = imageSrc;
    document.getElementById("lightbox").style.display = "block";
}
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// FORM VALIDATION
document.addEventListener("DOMContentLoaded", function() {
    
    const enquiryForm = document.getElementById("enquiryForm");
    const errorMessage = document.getElementById("error-message");

    if (enquiryForm) {
        enquiryForm.addEventListener("submit", function(event) {
            event.preventDefault(); 
            const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            errorMessage.textContent = "";

            if (fullName === "" || email === "" || message === "") {
                errorMessage.textContent = "❌ Please fill in all required fields.";
            } else if (!email.includes("@") || !email.includes(".")) {
                errorMessage.textContent = "❌ Please enter a valid email address.";
            } else {
                errorMessage.textContent = "✅ Thank you, " + fullName + "! Your enquiry has been sent.";
                errorMessage.style.color = "green";
                enquiryForm.reset();
            }
        });
    }

    const contactForm = document.getElementById("contactForm");
    const contactError = document.getElementById("contact-error");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const contactName = document.getElementById("contactName").value.trim();
            const contactEmail = document.getElementById("contactEmail").value.trim();
            const contactMessage = document.getElementById("contactMessage").value.trim();

            contactError.textContent = "";

            if (contactName === "" || contactEmail === "" || contactMessage === "") {
                contactError.textContent = "❌ Please fill in all required fields.";
            } else if (!contactEmail.includes("@") || !contactEmail.includes(".")) {
                contactError.textContent = "❌ Please enter a valid email address.";
            } else {
                contactError.textContent = "✅ Thank you, " + contactName + "! Your message has been received.";
                contactError.style.color = "green";
                contactForm.reset();
            }
        });
    }
});