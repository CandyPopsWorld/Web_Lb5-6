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
