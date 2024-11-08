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

    public Page<Product> getFilteredProducts(Pageable pageable, Double minTemperature, Double maxTemperature,
                                             Double minMaxCommission, Double maxMaxCommission, Double minMaxCommissionPercentage,
                                             Double maxMaxCommissionPercentage, Double minPrice, Double maxPrice, String currency,
                                             String locale, Double rating, Double blueprint, Integer reviewCount, String hasText, String hasntText,
                                             String category, String format, String cookieRule, String cookieDuration, Boolean hotleads,
                                             Boolean recurring, String affiliationRule) {

        String currencyFilter = (currency == null || currency.trim().isEmpty()) ? "" : currency;
        String localeFilter = (locale == null || locale.trim().isEmpty()) ? "" : locale;

        return productRepository.findWithFilters(
                minTemperature, maxTemperature, minMaxCommission, maxMaxCommission, minMaxCommissionPercentage, maxMaxCommissionPercentage,
                minPrice, maxPrice, currencyFilter, localeFilter, rating, blueprint, reviewCount, hasText, hasntText, category, format,
                cookieRule, cookieDuration, hotleads, recurring, affiliationRule, pageable
        );
    }
}