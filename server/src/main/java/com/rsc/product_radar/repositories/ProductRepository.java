package com.rsc.product_radar.repositories;

import com.rsc.product_radar.domain.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findAllByTemperatureBetweenAndMaxCommissionBetweenAndPriceBetween(
            Double minTemperature,
            Double maxTemperature,
            Double minMaxCommission,
            Double maxMaxCommission,
            Double minPrice,
            Double maxPrice,
            Pageable pageable
    );

}
