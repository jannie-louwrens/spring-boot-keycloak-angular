package com.example.demo.shop.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.shop.exceptions.DoesNotExistException;
import com.example.demo.shop.model.Order;
import com.example.demo.shop.repository.OrderRepository;

@Component
public class OrderServiceImpl {

	@Autowired
	private OrderRepository orderRepository;

	public OrderServiceImpl() {
	}

	public Order getOrder(String id) throws DoesNotExistException {
		Optional<Order> order = orderRepository.findById(id);
		if (!order.isPresent()) {
			throw new DoesNotExistException("Order");
		}
		return order.get();
	}

	public List<Order> getOrdersByCustomer(String customerId) {
		List<Order> list = new ArrayList<>();
		orderRepository.findByCustomerId(customerId).forEach(e -> list.add(e));
		return list;
	}

	public List<Order> getOrders() {
		List<Order> list = new ArrayList<>();
		orderRepository.findAll().forEach(e -> list.add(e));
		return list;
	}

	public Order createOrder(String customerId, Order order) {
		order.setCustomerId(customerId);
		return orderRepository.save(order);
	}

	public Order updateOrder(String id, Order order) throws DoesNotExistException {
		this.getOrder(id);
		order.setId(id);
		return orderRepository.save(order);
	}

}
