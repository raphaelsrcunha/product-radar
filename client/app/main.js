let products = [];
const endpointAPI = 'http://localhost:8080/products';
let currentPage = 0;
const pageSize = 20;
let totalPages = 0;
let totalFoundProducts = 0;
let totalFoundProductsNumber = document.getElementById('total-found-products-number');
let currentPageNumber = document.getElementById('current-page-number');
let totalPagesNumber = document.getElementById('total-pages-number');
const currentPageNumberElements = document.querySelectorAll('#current-page-number');
const totalPagesNumberElements = document.querySelectorAll('#total-pages-number');

const productsContainer = document.getElementById('products-container');
const nextPageButtons = document.querySelectorAll("#next-page-button");
const previousPageButton = document.querySelectorAll("#previous-page-button");
const orderingDropdown = document.getElementById("ordering-dropdown");
const eraseFiltersButton = document.getElementById("erase-filters-button");

const logoutBtn = document.getElementById('logout-btn');

const helloMessage = document.getElementById('container-hello');
const iconFirstLetter = document.getElementById('header-right__name-initial');

const userName = localStorage.getItem('name');    

helloMessage.innerHTML = `<p class="container-hello__text">Olá, ${userName}</p>`;

let selectedOption = [];
let sortField = "";
let sortDirection = "";

// Checking whether the user is authenticated or not to redirect to the authentication page
document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem('authToken');

    if(!token) {
        window.location.href = "http://127.0.0.1:5500/client/login.html";
    }
})

//Para seleção da plataforma no meu esquerdo
const gridItemHotmart = document.getElementById("grid-item-hotmart");
gridItemHotmart.classList.add('selected');

//Faz uma chamada para os produtos
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
const currency = document.getElementById('currency-dropdown');
const commissionRule = document.getElementById('commission-rule-dropdown');
const locale = document.getElementById('locale-dropdown');
const language = document.getElementById('language-dropdown');
const ratingDropdown = document.getElementById('rating-dropdown');
const minMaxCommissionPercentageInput = document.getElementById('min-max-commission-percentage');
const maxMaxCommissionPercentageInput = document.getElementById('max-max-commission-percentage');
const blueprintDropdown = document.getElementById('blueprint-dropdown');
const minRatingsDropdown = document.getElementById('min-ratings-dropdown');
const hasTextInput = document.getElementById('has-text');
const hasntTextInput = document.getElementById('hasnt-text');
const categoryDropdown = document.getElementById('category-dropdown');
const formatDropdown = document.getElementById('format-dropdown');
const cookieRuleDropdown = document.getElementById('cookie-rule-dropdown');
const cookieDurationDropdown = document.getElementById('cookie-duration-dropdown');
const hotleadsDropdown = document.getElementById('hotleads-dropdown');

[minTemperatureInput, maxTemperatureInput, minCommissionInput, maxCommissionInput, minPriceInput, maxPriceInput, minMaxCommissionPercentageInput, maxMaxCommissionPercentageInput, hasTextInput, hasntTextInput].forEach(input => {
    input.addEventListener('input', updateFilters);
});



function showProducts(products) {
    productsContainer.innerHTML = "";

     function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é baseado em 0
        return `${day}/${month}`;
    }

    // Função para calcular as datas
    function getDateLabels() {
        const today = new Date(); // Data atual
        const labels = [];

        // Adiciona as datas dos últimos dias
        labels.push("Atual"); // Hoje
        labels.push(formatDate(new Date(today.setDate(today.getDate() - 3)))); // 3 dias atrás
        labels.push(formatDate(new Date(today.setDate(today.getDate() - 6)))); // 9 dias atrás
        labels.push(formatDate(new Date(today.setDate(today.getDate() - 9)))); // 18 dias atrás

        today.setDate(today.getDate() + 18); // Para as operações futuras de data
        return labels.reverse(); // Reverte a ordem para "Hoje", "3 dias", "9 dias", "18 dias"
    }

    products.forEach(product => {
        
        const chartId = `chart-${product.id}`;

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
                                    <p>${product.rating.toFixed(1)}</p>
                                    <p>(${product.reviewCount} ${product.reviewCount !== 1 ? 'avaliações' : 'avaliação'})</p>
                                </div>
                                <div class="product-metrics__temperature">
                                    <img src="./resources/fire.svg" alt="">
                                    <p>(${product.temperature.toFixed(0)})</p>
                                </div>
                                <div class="product-metrics__blueprint">
                                    <img src="./resources/blueprint.svg" alt="">
                                    <p>(${product.blueprint}%)</p>
                                </div>
                            </div>
                            <p class="product-maximum-price"><b>Preço máximo do produto:</b> ${product.currency} ${product.price.toFixed(2)}</p>
                            <p class="product-maximum-comission"><b>Comissão máxima:</b> ${product.currency} ${product.maxCommission} (${product.maxCommissionPercentage}%)</p>
                            
                            <p class="popup-button" product-id="${product.id}">Mais informações</p>
                            <div id="popup-${product.id}" class="popup" style="display: none;">
                                <div class="popup-content">
                                    <span class="popup-content-header">
                                        <span class="close-button">&times;</span>
                                        <h2 class="popup-title">Links</h2>
                                    </span>

                                    
                                    <a href="${product.hotmartProductUrl}" target="_blank"><p class="popup-button-link">Página do Produto</p></a>
                                    <a href="${product.googleProductUrl}" target="_blank"><p class="popup-button-link">Rede de Pesquisa - Produto</p></a>
                                    <a href="${product.googleProducerUrl}" target="_blank"><p class="popup-button-link">Rede de Pesquisa - Produtor</p></a>
                                    <a href="${product.tiktokProducerUrl}" target="_blank"><p class="popup-button-link">Pesquisa TikTok - Produtor</p></a>
                                    <a href="${product.youtubeProductUrl}" target="_blank"><p class="popup-button-link">Pesquisa YouTube - Produto</p></a>
                                    <a href="${product.youtubeProducerUrl}" target="_blank"><p class="popup-button-link">Pesquisa YouTube - Produtor</p></a>
                                </div>
                            </div>
                        </div>
                        <div class="product-container-body__right" style="width: 300px; margin-left: 0px; margin-top: 0px; width: 40%; height: 100%">
                            <canvas id="${chartId}" width="10" height="5"></canvas>
                        </div>
                        
                    </div>
                </div>
            </div>
        `;

    
        setTimeout(() => {
            const ctx = document.getElementById(chartId).getContext('2d');
            const labels = getDateLabels(); // Chama a função para pegar as labels com as datas

            // Cria um gráfico para cada produto, usando dados específicos
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        data: [
                            product.ago18Days.toFixed(0), 
                            product.ago9Days.toFixed(0), 
                            product.ago3Days.toFixed(0), 
                            product.temperature.toFixed(0)
                        ],
                        borderColor: 'rgba(0, 255, 0, 1)',
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        borderWidth: 2,
                        pointBackgroundColor: 'black',
                        pointBorderColor: 'black',
                        pointRadius: 4
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                            callbacks: {
                                label: function(context) {
                                    return `Valor: ${context.raw}`;
                                }
                            },
                            displayColors: false,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            titleColor: '#ffffff',
                            bodyColor: '#ffffff'
                        },
                        datalabels: {
                            align: 'top',
                            anchor: 'end',
                            color: 'white',
                            font: {
                                size: 15
                            },
                            formatter: function(value) {
                                return value;
                            }
                        },
                        title: {
                            display: true, // Exibe o título
                            text: 'Temperatura nos últimos dias', // Define o texto do título
                            color: 'white', // Define a cor do título
                            font: {
                                size: 15, // Define o tamanho do título
                                weight: 400
                            },
                            padding: {
                                top: 0,
                                bottom: 5
                            }
                        }
                    },
                    scales: {
                        y: {
                            suggestedMin: 0,
                            suggestedMax: 180,
                            beginAtZero: false,
                            grid: {
                                display: true
                            },
                            ticks: {
                                color: 'white',
                                font: {
                                    size: 14
                                },
                                callback: function(value) {
                                    // Exibe apenas 0, 100 e 200
                                    if (value === 50 || value === 150) {
                                        return value;
                                    }
                                    return ''; // Retorna uma string vazia para não exibir outros valores
                                }
                            },
                            borderColor: 'black',
                            borderWidth: 8
                        },
                        x: {
                            grid: {
                                display: true
                            },
                            ticks: {
                                color: 'white',
                                font: {
                                    size: 14 // Aumenta o tamanho da fonte dos valores no eixo Y
                                }
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });
        }, 0);
        
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

        //Close popup if press ESC
        document.addEventListener('keydown', function(e) {
            if(e.key === "Escape") {
                const popup = button.closest('.popup');
                popup.style.display = 'none';
            }
        })

    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup')) {
            event.target.style.display = 'none'; // Oculta o popup se clicar fora dele
        }
    });
}

//country.addEventListener('change', updateFilters);
//currency.addEventListener('change', getProducts);

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
    const currency = document.getElementById('currency-dropdown').value;
    const locale = document.getElementById('locale-dropdown').value;
    const rating = document.getElementById('rating-dropdown').value;
    const minMaxCommissionPercentage = document.getElementById('min-max-commission-percentage').value;
    const maxMaxCommissionPercentage = document.getElementById('max-max-commission-percentage').value;
    const blueprint = document.getElementById('blueprint-dropdown').value;
    const minRatings = document.getElementById('min-ratings-dropdown').value;
    const hasText = document.getElementById('has-text').value;
    const hasntText = document.getElementById('hasnt-text').value;
    const category = document.getElementById('category-dropdown').value;
    const format = document.getElementById('format-dropdown').value;
    const cookieRule = document.getElementById('cookie-rule-dropdown').value;
    const cookieDuration = document.getElementById('cookie-duration-dropdown').value;
    const hotleads = document.getElementById('hotleads-dropdown').value;

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
    if (currency && currency !== "0") params.append('currency', currency);
    if (locale && locale !== "0") params.append('locale', locale);
    if (rating && rating !== "0") params.append('rating', rating);
    if (minMaxCommissionPercentage) params.append('minMaxCommissionPercentage', minMaxCommissionPercentage);
    if (maxMaxCommissionPercentage) params.append('maxMaxCommissionPercentage', maxMaxCommissionPercentage);
    if (blueprint && blueprint !== "0") params.append('blueprint', blueprint);
    if (minRatings && minRatings !== "0") params.append('reviewCount', minRatings);
    if(hasText) params.append('hasText', hasText);
    if(hasntText) params.append('hasntText', hasntText);
    if (category && category !== "0") params.append('category', category);
    if (format && format !== "0") params.append('format', format);
    if (cookieRule && cookieRule !== "0") params.append('cookieRule', cookieRule);
    if (cookieDuration && cookieDuration !== "0") params.append('cookieDuration', cookieDuration);
    if (hotleads && hotleads !== "0") params.append('hotleads', hotleads);
 
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
    const totalFormated = parseInt(totalFoundProducts).toLocaleString('pt-BR')
    totalFoundProductsNumber.textContent = totalFormated;

    currentPageNumberElements.forEach(currentPageNumber =>
        currentPageNumber.textContent = currentPage + 1
    );
    totalPagesNumberElements.forEach(totalPagesNumber =>
        totalPagesNumber.textContent = totalPages
    )

    showProducts(products);
    updatePagination(); 
}

const currencyDropdown = document.getElementById('currency-dropdown');
currencyDropdown.addEventListener('change', updateFilters);

const localeDropdown = document.getElementById('locale-dropdown');
localeDropdown.addEventListener('change', updateFilters);
ratingDropdown.addEventListener('change', updateFilters);
blueprintDropdown.addEventListener('change', updateFilters);
minRatingsDropdown.addEventListener('change', updateFilters);
categoryDropdown.addEventListener('change', updateFilters);
formatDropdown.addEventListener('change', updateFilters);
cookieRuleDropdown.addEventListener('change', updateFilters);
cookieDurationDropdown.addEventListener('change', updateFilters);
hotleadsDropdown.addEventListener('change', updateFilters);

function updatePagination() {
    nextPageButtons.forEach(button => 
        button.disabled = currentPage >= totalPages - 1
    )

    previousPageButton.forEach(button =>
        button.disabled = currentPage === 0
    )
}

nextPageButtons.forEach(button =>
    button.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            getProducts(currentPage, sortField, sortDirection);
        }
    })
);

previousPageButton.forEach(button => 
    button.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            getProducts(currentPage, sortField, sortDirection);
        }
    })
);

// Menu FILTROS
document.addEventListener("DOMContentLoaded", function() {
    const collapsibleButton = document.querySelector(".collapsible");

    collapsibleButton.addEventListener("click", function() {
        this.classList.toggle("active");
        const content = document.querySelector(".collapsible-content");

        // Alterna a classe 'open' para animar a altura
        content.classList.toggle("open");

        this.textContent = collapsibleButton.classList.contains("active") ? "Ocultar Filtros" : "Ver Filtros";
    });

    if(collapsibleButton.classList.contains("active")) {
        console.log("active")
    }
});

eraseFiltersButton.addEventListener("click", () => {
    [minTemperatureInput, maxTemperatureInput, minCommissionInput, maxCommissionInput, minPriceInput, maxPriceInput, locale, minMaxCommissionPercentageInput, maxMaxCommissionPercentageInput, hasTextInput, hasntTextInput].forEach(input => {
        input.value = "";
    });
    document.getElementById('currency-dropdown').value = "0";
    document.getElementById('locale-dropdown').value = "0";
    document.getElementById('rating-dropdown').value = "0";
    blueprintDropdown.value = "0";
    minRatingsDropdown.value = "0";
    categoryDropdown.value = "0";
    formatDropdown.value = "0";
    cookieRuleDropdown.value = "0";
    cookieDurationDropdown.value = "0";
    hotleadsDropdown.value = "0";
    getProducts(1, sortField, sortDirection);
})

logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();

    localStorage.clear();
    window.location.href = "http://127.0.0.1:5500/client/login.html";
})

// Menu do usuário
document.addEventListener('DOMContentLoaded', function() {
    const nameInitial = document.getElementById('header-right__name-initial');
    const menu = document.getElementById('menu');

    nameInitial.addEventListener('click', function(event) {
        event.stopPropagation(); // Impede a propagação do clique, senão ele abre e fecha ao mesmo tempo
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block'; 
    });

    // Essa função é para esconder o menu quando clicamos fora dele
    document.addEventListener('click', function() {
        menu.style.display = 'none'; 
    });
});

//Ícone com a primeira letra do nome no meu superior direito
iconFirstLetter.textContent = userName[0];