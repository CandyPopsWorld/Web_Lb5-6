// Обработчик удаления товара из корзины
document.addEventListener("DOMContentLoaded", () => {
    const closeIcons = document.querySelectorAll(".close-icon");

    closeIcons.forEach((icon) => {
        icon.addEventListener("click", (event) => {
            const cartItem = event.target.closest(".cart-item");
            if (cartItem) {
                cartItem.remove();
                updateTotal();
            }
        });
    });

    // Обработчик для кнопки "CLEAR SHOPPING CART"
    const clearCartButton = document.querySelector(".clear-cart");
    if (clearCartButton) {
        clearCartButton.addEventListener("click", () => {
            const cartItems = document.querySelector(".cart-items");
            cartItems.innerHTML = "";
            updateTotal();
        });
    }

    // Обновление итоговой суммы
    function updateTotal() {
        const totalPriceElement = document.querySelector(".summary-total span");
        const prices = Array.from(document.querySelectorAll(".item-detail span"))
            .filter((span) => span.textContent.includes("$"))
            .map((span) => parseFloat(span.textContent.replace("$", "")));

        const total = prices.reduce((sum, price) => sum + price, 0);
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }
});

const products = [
    {
        name: "Red Dress",
        price: 120.00,
        description: "Elegant red dress for special occasions.",
        image: "images/item1.jpg"
    },
    {
        name: "Blue Jeans",
        price: 75.00,
        description: "Classic blue jeans with a modern fit.",
        image: "images/item2.jpg"
    },
    {
        name: "Leather Jacket",
        price: 250.00,
        description: "Stylish leather jacket for any weather.",
        image: "images/item3.jpg"
    },
    {
        name: "Running Shoes",
        price: 90.00,
        description: "Comfortable running shoes for everyday use.",
        image: "images/item4.jpg"
    },
    {
        name: "Backpack",
        price: 65.00,
        description: "Durable and spacious backpack for travel.",
        image: "images/item5.jpg"
    },
    {
        name: "Sunglasses",
        price: 45.00,
        description: "Trendy sunglasses with UV protection.",
        image: "images/item6.jpg"
    }
];


// Функция для создания разметки одного товара
function createProductMarkup(product) {
    return `
        <div class="item-card">
            <img src="${product.image}" alt="${product.name}">
            <h3 class="item-title">${product.name}</h3>
            <p class="item-description">${product.description}</p>
            <p class="item-price">$${product.price.toFixed(2)}</p>
        </div>
    `;
}

// Функция для отображения всех товаров в контейнере
function renderProductsList() {
    const container = document.querySelector(".goods-list .items-grid");
    if (!container) return;

    const productsMarkup = products.map(createProductMarkup).join("");

    container.innerHTML = productsMarkup;
}

document.addEventListener("DOMContentLoaded", () => {
    renderProductsList();
});

class GoodsItem {
    constructor(title, price, image, color, size, quantity) {
        this.title = title;
        this.price = price;
        this.image = image;
        this.color = color;
        this.size = size;
        this.quantity = quantity;
    }

    render() {
        return `
            <div class="cart-item">
                <div class="item-left">
                    <img src="${this.image}" alt="${this.title}" class="item-image">
                </div>
                <div class="item-right">
                    <div class="item-header">
                        <h4 class="item-name">${this.title}</h4>
                        <img src="images/close.svg" alt="Close" class="close-icon">
                    </div>
                    <p class="item-detail">Price: <span>$${this.price.toFixed(2)}</span></p>
                    <p class="item-detail">Color: <span>${this.color}</span></p>
                    <p class="item-detail">Size: <span>${this.size}</span></p>
                    <p class="item-detail">Quantity: <span>${this.quantity}</span></p>
                </div>
            </div>
        `;
    }
    // Метод для вычисления стоимости одного товара
    getTotalPrice() {
        return this.price * this.quantity;
    }
}

class GoodsList {
    constructor() {
        this.goods = []; // Массив для хранения товаров
    }

    fetchGoods() {
        this.goods = [
            new GoodsItem("Red Dress", 120.00, "images/item1.jpg", "Red", "M", 2),
            new GoodsItem("Blue Jeans", 75.00, "images/item2.jpg", "Blue", "L", 1),
            new GoodsItem("Leather Jacket", 250.00, "images/item3.jpg", "Black", "XL", 1),
        ];
    }

    render() {
        const container = document.querySelector(".cart-items");
        const totalContainer = document.querySelector(".summary-total span");
        if (!container) return;

        const itemsMarkup = this.goods.map(item => item.render()).join("");

        container.innerHTML = `
            ${itemsMarkup}
            <div class="cart-buttons">
                <button class="clear-cart">CLEAR SHOPPING CART</button>
                <button class="continue-shopping">CONTINUE SHOPPING</button>
            </div>
        `;

        // Подсчитываем общую стоимость всех товаров
        const totalPrice = this.goods.reduce((total, item) => total + item.getTotalPrice(), 0);
        totalContainer.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const goodsList = new GoodsList();
    goodsList.fetchGoods(); // Заполняем список товаров
    goodsList.render();     // Отображаем список
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".subscribe-form");
    const emailInput = document.getElementById("emailInput");
    const errorMessage = document.getElementById("error-message");

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();

        if (!emailRegex.test(email)) {
            emailInput.style.border = "2px solid red";
            errorMessage.style.display = "block";
        } else {
            emailInput.style.border = "";
            errorMessage.style.display = "none";
            alert("Подписка успешна!");
        }
    });
});
