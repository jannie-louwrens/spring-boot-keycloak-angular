package com.example.demo.shop.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table
public class ProductCatalog extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(nullable = true)
	private String name;

	@Column(length = 4000, nullable = true)
	private String description;

	public ProductCatalog() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
