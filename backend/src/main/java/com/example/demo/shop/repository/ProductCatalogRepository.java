package com.example.demo.shop.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.shop.model.ProductCatalog;

@Repository
public interface ProductCatalogRepository extends CrudRepository<ProductCatalog, String> {

}
