package com.rsc.product_radar.controller;

import com.rsc.product_radar.domain.product.Product;
import com.rsc.product_radar.domain.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<Page<Product>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false, defaultValue = "0") Double minTemperature,
            @RequestParam(required = false, defaultValue = "999") Double maxTemperature,
            @RequestParam(required = false, defaultValue = "0") Double minMaxCommission,
            @RequestParam(required = false, defaultValue = "99999999") Double maxMaxCommission,
            @RequestParam(required = false, defaultValue = "0") Double minMaxCommissionPercentage,
            @RequestParam(required = false, defaultValue = "100") Double maxMaxCommissionPercentage,
            @RequestParam(required = false, defaultValue = "0") Double minPrice,
            @RequestParam(required = false, defaultValue = "999999999") Double maxPrice,
            @RequestParam(required = false) String currency,
            @RequestParam(required = false) String locale,
            @RequestParam(required = false) Double rating,
            @RequestParam(required = false) Double blueprint) {

        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction != null ? direction : "asc"), sort != null ? sort : "id");
        Pageable pageable = PageRequest.of(page, size, sortOrder);
        Page<Product> products = productService.getFilteredProducts(pageable, minTemperature, maxTemperature, minMaxCommission, maxMaxCommission, minMaxCommissionPercentage, maxMaxCommissionPercentage, minPrice, maxPrice, currency, locale, rating, blueprint);
        return ResponseEntity.ok(products);
    }

}
