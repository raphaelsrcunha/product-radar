let products = [];
const endpointAPI = 'http://localhost:8080/products';
let currentPage = 0;
const pageSize = 20;
let totalPages = 0;
let totalFoundProducts = 0;
let totalFoundProductsNumber = document.getElementById('total-found-products-number');
let currentPageNumber = document.getElementById('current-page-number');
let totalPagesNumber = document.getElementById('total-pages-number');

const productsContainer = document.getElementById('products-container');
const previousPageButton = document.getElementById("previous-page-button");
const nextPageButton = document.getElementById("next-page-button");
const orderingDropdown = document.getElementById("ordering-dropdown");
const eraseFiltersButton = document.getElementById("erase-filters-button");

const logoutBtn = document.getElementById('logout-btn');

const helloMessage = document.getElementById('container-hello');
const userName = localStorage.getItem('name');    

let selectedOption = [];
let sortField = "";
let sortDirection = "";

helloMessage.innerHTML = `<p class="container-hello__text">Olá, ${userName}</p>`;

// Checagem se o usuário está autenticado ou não para redirecionar para a página de autenticação
document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem('authToken');

    if(!token) {
        window.location.href = "http://127.0.0.1:5500/client/login.html";
    }
})

getProducts(currentPage, sortField, sortDirection);

// Função debounce
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

// Função para atualizar os filtros com debounce
const updateFilters = debounce(() => {
    getProducts(currentPage, sortField, sortDirection);
}, 800);

// Adiciona eventos de input aos campos de filtro
const minTemperatureInput = document.getElementById('min-temperature-input');
const maxTemperatureInput = document.getElementById('max-temperature-input');
const minCommissionInput = document.getElementById('min-commission-input');
const maxCommissionInput = document.getElementById('max-commission-input');
const minPriceInput = document.getElementById('min-price-input');
const maxPriceInput = document.getElementById('max-price-input');

[minTemperatureInput, maxTemperatureInput, minCommissionInput, maxCommissionInput, minPriceInput, maxPriceInput].forEach(input => {
    input.addEventListener('input', updateFilters);
});

function showProducts(products) {
    productsContainer.innerHTML = "";

    products.forEach(product => {
        productsContainer.innerHTML += `
            <div class="product-container">
                <div class="product-container__image">
                    <img src="${product.productImageUrl}" alt="" class="img-product">
                </div>
                <div class="product-infos">
                    <div class="product-infos__header">
                        <div class="product-infos__header__left">
                            <h2 class="product-name">${product.productName}</h2>
                            <p class="product-author"><a href="#">${product.producerName}</a></p>
                        </div>
                        <div class="product-infos__header__right">
                            <img src="./resources/favorite.svg" alt="">
                        </div>
                    </div>
                    <div class="product-container-body">
                        <div class="product-container-body__left">
                            <p class="product-category">${product.category}</p>
                            <div class="product-metrics">
                                <div class="product-metrics__stars">                            
                                    <img src="./resources/star.svg" alt="">
                                    <p>${product.rating}</p>
                                    <p>(${product.reviewCount} avaliações)</p>
                                </div>
                                <div class="product-metrics__temperature">
                                    <img src="./resources/fire.svg" alt="">
                                    <p>(${product.temperature})</p>
                                </div>
                                <div class="product-metrics__blueprint">
                                    <img src="./resources/blueprint.svg" alt="">
                                    <p>(${product.blueprint}%)</p>
                                </div>
                            </div>
                            <p class="product-maximum-price"><b>Preço máximo do produto:</b> R$ ${product.price}</p>
                            <p class="product-maximum-comission"><b>Comissão máxima:</b> R$ ${product.maxCommission} (${product.maxCommissionPercentage}%)</p>
                            
                            <p class="popup-button" product-id="${product.id}">Mais informações</p>
                            <div id="popup-${product.id}" class="popup" style="display: none;">
                                <div class="popup-content">
                                    <span class="close-button">&times;</span>
                                    <h2>Links</h2>
                                    <p class="popup-button"><a href="${product.hotmartProductUrl}" target="_blank">Página do Produto</a></p>
                                    <p class="popup-button"><a href="${product.googleProductUrl}" target="_blank">Rede de Pesquisa - Produto</a></p>
                                    <p class="popup-button"><a href="${product.googleProducerUrl}" target="_blank">Rede de Pesquisa - Produtor</a></p>
                                    <p class="popup-button"><a href="${product.tiktokProducerUrl}" target="_blank">Pesquisa TikTok - Produtor</a></p>
                                    <p class="popup-button"><a href="${product.youtubeProductUrl}" target="_blank">Pesquisa YouTube - Produto</a></p>
                                    <p class="popup-button"><a href="${product.youtubeProducerUrl}" target="_blank">Pesquisa YouTube - Produtor</a></p>
                                </div>
                            </div>
                        </div>
                        <div class="product-container-body__right">
                            <div class="variation-container">
                                <img src="./resources/fire.svg" alt=""><p><b>3 dias: </b>${product.change3Days}</p>
                            </div>
                            <div class="variation-container">
                                <img src="./resources/fire.svg" alt=""><p><b>6 dias: </b>${product.change6Days}</p>
                            </div>
                            <div class="variation-container">
                                <img src="./resources/fire.svg" alt=""><p><b>9 dias: </b>${product.change9Days}</p>
                            </div>
                            <div class="variation-container">
                                <img src="./resources/fire.svg" alt=""><p><b>18 dias: </b>${product.change18Days}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // Adiciona eventos para os botões de abrir e fechar popups aqui
    const openPopupButtons = document.querySelectorAll('.popup-button');
    const closeButtons = document.querySelectorAll('.close-button');

    openPopupButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('product-id');
            const popup = document.getElementById(`popup-${productId}`);
            popup.style.display = 'block'; // Mostra o popup
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.closest('.popup');
            popup.style.display = 'none'; // Oculta o popup
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup')) {
            event.target.style.display = 'none'; // Oculta o popup se clicar fora dele
        }
    });
}

orderingDropdown.addEventListener('change', () => {
    currentPage = 0;
    selectedOption = orderingDropdown.value.split('-');
    sortField = selectedOption[0];
    sortDirection = selectedOption[1];
    updateFilters(); // Chama a função de atualização de filtros
});

async function getProducts(page, sortField, sortDirection) {
    const minTemperature = document.getElementById('min-temperature-input').value;
    const maxTemperature = document.getElementById('max-temperature-input').value;
    const minMaxCommission = document.getElementById('min-commission-input').value;
    const maxMaxCommission = document.getElementById('max-commission-input').value;
    const minPrice = document.getElementById('min-price-input').value;
    const maxPrice = document.getElementById('max-price-input').value;

    const params = new URLSearchParams();
    params.append('page', page);
    params.append('size', pageSize);
    params.append('sort', sortField);
    params.append('direction', sortDirection);

    const token = localStorage.getItem('authToken');

    if (minTemperature) params.append('minTemperature', minTemperature);
    if (maxTemperature) params.append('maxTemperature', maxTemperature);
    if (minMaxCommission) params.append('minMaxCommission', minMaxCommission);
    if (maxMaxCommission) params.append('maxMaxCommission', maxMaxCommission);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
 
    const res = await fetch(`${endpointAPI}?${params.toString()}`, {
        headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': `Bearer ${token}` 
            },
    });
    const data = await res.json();
    products = data.content; 
    totalPages = data.totalPages;
    totalFoundProducts = data.totalElements;
    totalFoundProductsNumber.textContent = totalFoundProducts;
    currentPageNumber.textContent = currentPage + 1;
    totalPagesNumber.textContent = totalPages;
    
    showProducts(products);
    updatePagination(); // Atualiza informações de paginação
}

function updatePagination() {
    nextPageButton.disabled = currentPage >= totalPages - 1; // Desabilita se for a última página
    previousPageButton.disabled = currentPage === 0; // Desabilita se for a primeira página
}

nextPageButton.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
        currentPage++;
        getProducts(currentPage, sortField, sortDirection);
    }
});

previousPageButton.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        getProducts(currentPage, sortField, sortDirection);
    }
});

// Menu FILTROS
document.addEventListener("DOMContentLoaded", function() {
    const collapsibles = document.querySelectorAll(".collapsible");

    collapsibles.forEach(button => {
        button.addEventListener("click", function() {
            this.classList.toggle("active");
            const content = this.nextElementSibling;

            // Alterna a classe 'open' para animar a altura
            content.classList.toggle("open");
        });
    });
});

eraseFiltersButton.addEventListener("click", () => {
    [minTemperatureInput, maxTemperatureInput, minCommissionInput, maxCommissionInput, minPriceInput, maxPriceInput].forEach(input => {
        input.value = "";
    });
    getProducts(currentPage, sortField, sortDirection);
})

logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();

    localStorage.clear();
    window.location.href = "http://127.0.0.1:5500/client/login.html";
})