// Simple redwine.js
console.log("RedWine.js loaded successfully!");
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing wine cards...");
    
    const wineCards = document.querySelectorAll('.wine-card');
    console.log("Found", wineCards.length, "wine cards");
    
    wineCards.forEach((card, index) => {
        console.log("Setting up card", index);
        
        card.addEventListener('click', function() {
            console.log("Card clicked:", this);
        });
        
        // Add to cart buttons
        const button = card.querySelector('.add-to-cart');
        if (button) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log("Add to cart clicked");
                this.textContent = 'Added!';
                setTimeout(() => {
                    this.textContent = 'Add to Cart';
                }, 1000);
            });
        }
    });
});