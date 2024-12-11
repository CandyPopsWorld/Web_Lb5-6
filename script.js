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