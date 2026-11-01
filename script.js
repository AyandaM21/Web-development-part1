
let cartItems = [];
let cartTotalPrice = 0;

function addToCart(itemName, itemPrice) {
    // Add the item to our list
    cartItems.push({ name: itemName, price: itemPrice });
    cartTotalPrice += itemPrice;
    
    // The  number in the header
    document.getElementById("cart-count").textContent = cartItems.length;
    
    // Open cart popup modal
    openCart(); 
}

function openCart() {
    let cartList = document.getElementById("cart-items-list");
    cartList.innerHTML = ""; 
    
    // Loop
    for (let i = 0; i < cartItems.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = "<span>" + cartItems[i].name + "</span> <span>R" + cartItems[i].price.toFixed(2) + "</span>";
        cartList.appendChild(li);
    }
    
    document.getElementById("cart-total-price").textContent = "Total: R" + cartTotalPrice.toFixed(2)
    document.getElementById("cartModal").style.display = "block";
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}


// FORM VALIDATION LOGIC
document.addEventListener("DOMContentLoaded", function() {
    
    // --- ENQUIRY FORM ---
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

    //  CONTACT FORM 
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

// Product Search 
function filterProducts() {
    // Get what the user typed
    let input = document.getElementById('searchInput').value.toLowerCase();
    
    // Get all the feature cards
    let cards = document.getElementsByClassName('feature-card');

    // Loop through all cards
    for (let i = 0; i < cards.length; i++) {
        // Get the text inside the card 
        let cardText = cards[i].innerText.toLowerCase();
        if (cardText.includes(input)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}

