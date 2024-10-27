CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    idHM BIGINT,
    product_name VARCHAR(255) NOT NULL,
    temperature DOUBLE NOT NULL,
    rating DOUBLE,
    review_count INT,
    blueprint DOUBLE,
    price DECIMAL(19, 2) NOT NULL
);
