document.addEventListener("DOMContentLoaded", () => {
  // Main DOM elements
  const productList = document.getElementById("product-list");
  const searchInput = document.getElementById("search-input");
  const searchResult = document.getElementById("search-result");
  const itemsPerPage = 9;
  let currentPage = 1;
  let allCards = [];

  // Fetch product data from external source
  fetch(
    "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/marketofserena_predefined_datas.json"
  )
    .then((response) =>
      response.ok ? response.json() : Promise.reject("Error")
    )
    .then((data) => {
      allCards = Object.entries(data.cards);

      // Render product cards based on current page and filtered data
      const renderProducts = (page, filteredCards = allCards) => {
        productList.innerHTML = "";
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        filteredCards
          .slice(startIndex, endIndex)
          .forEach(([image, [description, price]]) => {
            const productCard = `
              <div class="product-card product-card-hover">
                <img src="https://raw.githubusercontent.com/RyuZinOh/static-assets/main/Cards/${image}" alt="${description}">
                <div class="hover-drawer">
                  <h3>${description}</h3>
                  <p class="price">₹${price}</p>
                  <a href="#" class="buy-btn-hover">Buy Now</a>
                </div>
              </div>
            `;
            productList.insertAdjacentHTML("beforeend", productCard);
          });

        searchResult.textContent =
          filteredCards.length === allCards.length
            ? "Showing all products"
            : `Found ${filteredCards.length} product(s)`;

        renderPagination(Math.ceil(filteredCards.length / itemsPerPage), page);
      };

      // Render pagination buttons
      const renderPagination = (totalPages, currentPage) => {
        const paginationContainer = document.createElement("div");
        paginationContainer.className = "pagination";

        for (let i = 1; i <= totalPages; i++) {
          const button = document.createElement("button");
          button.textContent = i;
          if (i === currentPage) {
            button.classList.add("active");
          }
          button.addEventListener("click", () => {
            currentPage = i;
            renderProducts(currentPage, filteredCards);
          });
          paginationContainer.appendChild(button);
        }

        const existingPagination = document.querySelector(".pagination");
        if (existingPagination) {
          existingPagination.remove();
        }
        productList.insertAdjacentElement("afterend", paginationContainer);
      };

      // Initial rendering of products
      renderProducts(currentPage);

      // Search functionality for filtering products
      let filteredCards = allCards;
      searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filteredCards = allCards.filter(([image, [description, price]]) =>
          description.toLowerCase().includes(searchTerm)
        );
        currentPage = 1;
        renderProducts(currentPage, filteredCards);
      });
    })
    .catch(() => {
      productList.innerHTML =
        "<p>Failed to load products. Please try again later.</p>";
    });
});
