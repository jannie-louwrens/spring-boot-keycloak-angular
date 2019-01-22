package com.example.demo.shop.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.example.demo.shop.model.Order;
import com.example.demo.shop.service.OrderServiceImpl;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderController {

	@Autowired
	private OrderServiceImpl orderService;

	@GetMapping("/orders/{id}")
	public Order getOrder(@PathVariable String id) throws DoesNotExistException {
		return orderService.getOrder(id);
	}

	@GetMapping("/orders")
	public List<Order> searchForOrders(@RequestParam("customerId") Optional<String> customerId) {
		if (customerId.isPresent()) {
			return orderService.getOrdersByCustomer(customerId.get());
		}
		return orderService.getOrders();
	}

	@PostMapping("/orders")
	public Order createOrder(@RequestParam("customerId") String customerId, @Valid @RequestBody Order order) {
		return orderService.createOrder(customerId, order);
	}

	@PutMapping("/orders/{id}")
	public Order updateOrder(@PathVariable String id, @Valid @RequestBody Order order) throws DoesNotExistException {
		return orderService.updateOrder(id, order);
	}

}
