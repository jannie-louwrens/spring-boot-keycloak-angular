package com.example.demo.shop.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.shop.exceptions.DoesNotExistException;
import com.example.demo.shop.model.Product;
import com.example.demo.shop.repository.ProductRepository;

@Component
public class ProductServiceImpl {

	@Autowired
	private ProductRepository productRepository;

	public ProductServiceImpl() {
	}

	public Product getProduct(String id) throws DoesNotExistException {
		Optional<Product> product = productRepository.findById(id);
		if (!product.isPresent()) {
			throw new DoesNotExistException("Product");
		}
		return product.get();
	}

	public List<Product> getProductsByProductCatalog(String productCatalogId) {
		List<Product> list = new ArrayList<>();
		productRepository.findByProductCatalogId(productCatalogId).forEach(e -> list.add(e));
		return list;
	}

	public List<Product> getEffectiveProductsByProductCatalogOnDate(String productCatalogId, LocalDate date) {
		List<Product> list = new ArrayList<>();
		productRepository.findByProductCatalogIdOnDate(productCatalogId, date).forEach(e -> list.add(e));
		return list;
	}

	public List<Product> getProducts() {
		List<Product> list = new ArrayList<>();
		productRepository.findAll().forEach(e -> list.add(e));
		return list;
	}

	public List<Product> getEffectiveProductsOnDate(LocalDate date) {
		List<Product> list = new ArrayList<>();
		productRepository.findAllOnDate(date).forEach(e -> list.add(e));
		return list;
	}

	public Product createProduct(String productCatalogId, Product product) {
		product.setProductCatalogId(productCatalogId);
		return productRepository.save(product);
	}

	public Product updateProduct(String id, Product product) throws DoesNotExistException {
		this.getProduct(id);
		product.setId(id);
		return productRepository.save(product);
	}

}
