package com.example.demo.shop.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.shop.exceptions.DoesNotExistException;
import com.example.demo.shop.model.ProductCatalog;
import com.example.demo.shop.service.ProductCatalogServiceImpl;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProductCatalogController {

	@Autowired
	private ProductCatalogServiceImpl productCatalogService;

	@GetMapping("/productcatalogs/{id}")
	public ProductCatalog getProductCatalog(@PathVariable String id) throws DoesNotExistException {
		return productCatalogService.getProductCatalog(id);
	}

	@GetMapping("/productcatalogs")
	public List<ProductCatalog> getProductCatalogs() {
		return productCatalogService.getProductCatalogs();
	}

	@PostMapping("/productcatalogs")
	public ProductCatalog createProductCatalog(@Valid @RequestBody ProductCatalog productCatalog) {
		return productCatalogService.createProductCatalog(productCatalog);
	}

	@PutMapping("/productcatalogs/{id}")
	public ProductCatalog updateProductCatalog(@PathVariable String id,
			@Valid @RequestBody ProductCatalog productCatalog) throws DoesNotExistException {
		return productCatalogService.updateProductCatalog(id, productCatalog);
	}

}
