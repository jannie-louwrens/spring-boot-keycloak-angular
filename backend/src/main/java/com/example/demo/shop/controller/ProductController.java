package com.example.demo.shop.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.shop.exceptions.DoesNotExistException;
import com.example.demo.shop.model.Product;
import com.example.demo.shop.service.ProductServiceImpl;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProductController {

	@Autowired
	private ProductServiceImpl productService;

	@GetMapping("/products/{id}")
	public Product getProduct(@PathVariable String id) throws DoesNotExistException {
		return productService.getProduct(id);
	}

	@GetMapping("/products")
	public List<Product> searchForProducts(@RequestParam("productCatalogId") Optional<String> productCatalogId,
			@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> date) {
		if (productCatalogId.isPresent() && date.isPresent()) {
			return productService.getEffectiveProductsByProductCatalogOnDate(productCatalogId.get(), date.get());
		}
		if (productCatalogId.isPresent()) {
			return productService.getProductsByProductCatalog(productCatalogId.get());
		}
		if (date.isPresent()) {
			return productService.getEffectiveProductsOnDate(date.get());
		}
		return productService.getProducts();
	}

	@PostMapping("/products")
	public Product createProduct(@RequestParam("productCatalogId") String productCatalogId,
			@Valid @RequestBody Product product) {
		return productService.createProduct(productCatalogId, product);
	}

	@PutMapping("/products/{id}")
	public Product updateProduct(@PathVariable String id, @Valid @RequestBody Product product)
			throws DoesNotExistException {
		return productService.updateProduct(id, product);
	}

}
