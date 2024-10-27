package com.rsc.product_radar.domain.product;

import com.rsc.product_radar.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Page<Product> getFilteredProducts(Pageable pageable, Double minTemperature, Double maxTemperature, Double minMaxCommission, Double maxMaxCommission, Double minPrice, Double maxPrice) {
        return productRepository.findAllByTemperatureBetweenAndMaxCommissionBetweenAndPriceBetween(minTemperature, maxTemperature, minMaxCommission, maxMaxCommission, minPrice, maxPrice, pageable);
    }

}
