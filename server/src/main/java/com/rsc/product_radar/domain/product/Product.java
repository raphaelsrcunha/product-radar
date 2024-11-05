package com.rsc.product_radar.domain.product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Table(name="products")
@Entity(name="Product")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Product {

    @Id
    private Integer id;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(nullable = false)
    private Double temperature;

    @Column(name = "3_days")
    private Double ago3Days;

    @Column(name = "change_3_days")
    private Double change3Days;

    @Column(name = "6_days")
    private Double ago6Days;

    @Column(name = "change_6_days")
    private Double change6Days;

    @Column(name = "9_days")
    private Double ago9Days;

    @Column(name = "change_9_days")
    private Double change9Days;

    @Column(name = "18_days")
    private Double ago18Days;

    @Column(name = "change_18_days")
    private Double change18Days;

    @Column(nullable = false)
    private Double rating;

    @Column(name = "review_count")
    private Integer reviewCount;

    private Double blueprint;

    private String currency;

    private Double price;

    @Column(name = "max_commission")
    private Double maxCommission;

    @Column(name = "max_commission_percentage")
    private Double maxCommissionPercentage;

    private String category;

    private String locale;

    @Column(name = "producer_name")
    private String producerName;

    private String format;

    private Boolean recurring;

    @Column(name = "cookie_rule")
    private String cookieRule;

    @Column(name = "cookie_duration")
    private String cookieDuration;

    private Boolean hotleads;

    @Column(name = "affiliation_rule")
    private String affiliationRule;

    @Column(name = "product_image_url")
    private String productImageUrl;

    @Column(name = "google_product_url")
    private String googleProductUrl;

    @Column(name = "google_producer_url")
    private String googleProducerUrl;

    @Column(name = "tiktok_producer_url")
    private String tiktokProducerUrl;

    @Column(name = "hotmart_product_url")
    private String hotmartProductUrl;

    @Column(name = "youtube_product_url")
    private String youtubeProductUrl;

    @Column(name = "youtube_producer_url")
    private String youtubeProducerUrl;

}
