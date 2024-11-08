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
            "p.maxCommissionPercentage BETWEEN :minMaxCommissionPercentage AND :maxMaxCommissionPercentage AND " +
            "(:currency IS NULL OR :currency = '' OR p.currency = :currency) AND " +
            "(:locale IS NULL OR :locale = '' OR p.locale = :locale) AND " +
            "(:rating IS NULL OR p.rating >= :rating) AND " +
            "(:blueprint IS NULL OR p.blueprint >= :blueprint) AND " +
            "(:reviewCount IS NULL OR p.reviewCount >= :reviewCount) AND " +
            "(:hasText IS NULL OR :hasText = '' OR p.productName LIKE %:hasText%) AND " +
            "(:hasntText IS NULL OR :hasntText = '' OR p.productName NOT LIKE %:hasntText%) AND " +
            "(:category IS NULL OR p.category = :category) AND " +
            "(:format IS NULL OR :format = '' OR p.format = :format) AND " +
            "(:cookieRule IS NULL OR :cookieRule = '' OR p.cookieRule = :cookieRule) AND " +
            "(:cookieDuration IS NULL OR :cookieDuration = '' OR p.cookieDuration = :cookieDuration) AND " +
            "(:hotleads IS NULL OR p.hotleads = :hotleads) AND " +
            "(:recurring IS NULL OR p.recurring = :recurring) AND " +
            "(:affiliationRule IS NULL OR :affiliationRule = '' OR p.affiliationRule = :affiliationRule)")
    Page<Product> findWithFilters(
            @Param("minTemperature") Double minTemperature,
            @Param("maxTemperature") Double maxTemperature,
            @Param("minMaxCommission") Double minMaxCommission,
            @Param("maxMaxCommission") Double maxMaxCommission,
            @Param("minMaxCommissionPercentage") Double minMaxCommissionPercentage,
            @Param("maxMaxCommissionPercentage") Double maxMaxCommissionPercentage,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("currency") String currency,
            @Param("locale") String locale,
            @Param("rating") Double rating,
            @Param("blueprint") Double blueprint,
            @Param("reviewCount") Integer reviewCount,
            @Param("hasText") String hasText,
            @Param("hasntText") String hasntText,
            @Param("category") String category,
            @Param("format") String format,
            @Param("cookieRule") String cookieRule,
            @Param("cookieDuration") String cookieDuration,
            @Param("hotleads") Boolean hotleads,
            @Param("recurring") Boolean recurring,
            @Param("affiliationRule") String affiliationRule,
            Pageable pageable
    );

}