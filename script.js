let products = [
    {
        id: 1,
        name: "Laptop APPLE MacBook Air 15.3 Midnight",
        category: "Laptops",
        code: "543960",
        price: "$1,010",
        image: "./images/macbookone.webp"
    },
    {
        id: 2,
        name: "APPLE MacBook Air 15.3 M2 8/256GB 2023 (MQKW3UA/A) Midnight",
        category: "Laptops",
        code: "543962",
        price: "$2,199",
        image: "./images/laptoptwo.jpg"
    },
    {
        id: 3,
        name: "Clear Case for iPhone 15 Pro With MagSafe",
        category: "Accessories",
        code: "101431",
        price: "$55",
        image: "./images/cheholone.webp"
    },
    {
        id: 4,
        name: "Apple iPhone 14 Pro 128GB (Deep Purple) (e-Sim)",
        category: "Phones",
        code: "195434",
        price: "$899",
        image: "./images/phoneone.jpg"
    },
    {
        id: 5,
        name: "Baseus light electric holder wireless charger WXHW03-01 black",
        category: "Accessories",
        code: "324112",
        price: "$31",
        image: "./images/baseus.webp"
    },
    {
        id: 6,
        name: "Apple iPhone 15 Pro Max 256Gb uBlue Titanium",
        category: "Phones",
        code: "878652",
        price: "$1,099",
        image: "./images/appleph.webp"
    }, 
    {
        id: 7,
        name: "Apple iPhone 15 Pro Max 1TB White Titanium",
        category: "Phones",
        code: "018652",
        price: "$1,299",
        image: "./images/appletwo.png"
    },
    {
        id: 8,
        name: "MacBook Pro 13 Apple M2 (8C CPU/10C GPU)",
        category: "Laptops",
        code: "308652",
        price: "$2,200",
        image: "./images/macbooktwo.webp"
    },
    {
        id: 9,
        name: "CANYON WS-302 White (3in1 Wireless chaarger)",
        category: "Accessories",
        code: "324112",
        price: "$31",
        image: "./images/accesstwo.webp"
    },
    {
        id: 10,
        name: "MacBook Pro M2 Chip - 13(8C CPU/10C GPU)",
        category: "Laptops",
        code: "319852",
        price: "$2,311",
        image: "./images/macbookthree.png"
    },
    {
        id: 11,
        name: "Apple iPhone 12 Pro Max A2342 128 GB",
        category: "Phones",
        code: "018922",
        price: "$680",
        image: "./images/applethree.webp"
    },
    {
        id: 12,
        name: "Cable Apple USB-C to Lightning Cable 1m",
        category: "Accessories",
        code: "004110",
        price: "$12",
        image: "./images/accessthree.jpg"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    loadProducts('All');
    initializeCart();
});

function loadProducts(category) {
    let container = document.getElementById("container-id");
    let productsHtml = '';
    let filteredProducts = category === 'All' ? products : products.filter(product => product.category === category);
    filteredProducts.forEach(product => {
        productsHtml += `<div class="card">
            <img src="${product.image}" alt="card image" class="card__image">
            <h3 class="card__title">${product.name}</h3>
            <p class="card__code">Product code: ${product.code}</p>
            <div class="card__price">
                <span class="card__price-title">Price:</span>
                <span class="card__price-usd">${product.price}</span>
            </div>
            <button class="card__button" onclick='addProductToCart(${product.id})'>
                <span class="card__button-title" data-qa="card-hover">BUY</span>
            </button>
        </div>`;
    });
    container.innerHTML = productsHtml;
}

var modal = document.getElementById("cartModal");
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function openCart() {
    modal.style.display = "block";
    updateCartDisplay();
}

function initializeCart() {
    if (!sessionStorage.getItem('cartItems')) {
        sessionStorage.setItem('cartItems', JSON.stringify([]));
    }
    updateCartDisplay();
}

function addProductToCart(productId) {
    let product = products.find(item => item.id === productId);
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    let existingItem = cartItems.find(item => item.id === productId);
    if (!existingItem) {
        cartItems.push({ ...product, quantity: 1 });
    } else {
        existingItem.quantity += 1;
    }
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
}

function updateCartDisplay() {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    let cartHtml = '';
    let total = 0;
    cartItems.forEach(item => {
        let itemPrice = parseFloat(item.price.replace(/[$,]/g, ''));
        let itemTotal = itemPrice * item.quantity;
        total += itemTotal;
        cartHtml += `<div class="cart-item">
                        <p>${item.name} - Price: ${item.price}</p>
                        <button onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                        <button onclick="removeItemFromCart(${item.id})">Remove</button>
                    </div>`;
    });
    cartHtml += `<p>Total: $${total.toFixed(2)}</p>`;
    document.getElementById("cartItems").innerHTML = cartHtml;
}

function changeQuantity(productId, change) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    let item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cartItems = cartItems.filter(item => item.id !== productId);
        }
    }
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
}

function removeItemFromCart(productId) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    cartItems = cartItems.filter(item => item.id !== productId);
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
}

let scrollBtn = document.getElementById('scrollBtn');

scrollBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', function() {
    if (document.documentElement.scrollTop > window.innerHeight * 2 / 3) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});