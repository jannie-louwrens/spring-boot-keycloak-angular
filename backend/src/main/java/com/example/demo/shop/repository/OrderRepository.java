package com.example.demo.shop.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.shop.model.Order;

@Repository
public interface OrderRepository extends CrudRepository<Order, String> {

	List<Order> findByCustomerId(String customerId);

}
