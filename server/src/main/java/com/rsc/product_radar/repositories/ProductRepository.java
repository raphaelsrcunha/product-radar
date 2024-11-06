package com.rsc.product_radar.repositories;

import com.rsc.product_radar.domain.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE " +
            "p.temperature BETWEEN :minTemperature AND :maxTemperature AND " +
            "p.maxCommission BETWEEN :minMaxCommission AND :maxMaxCommission AND " +
            "p.price BETWEEN :minPrice AND :maxPrice AND " +
            "(:currency = '' OR p.currency = :currency) AND" +
            "(:locale = '' OR p.locale = :locale)")
    Page<Product> findWithFilters(
            @Param("minTemperature") Double minTemperature,
            @Param("maxTemperature") Double maxTemperature,
            @Param("minMaxCommission") Double minMaxCommission,
            @Param("maxMaxCommission") Double maxMaxCommission,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("currency") String currency,
            @Param("locale") String locale,
            Pageable pageable
    );
}