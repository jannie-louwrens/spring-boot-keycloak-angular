package com.example.demo.shop.controller;

import java.util.List;
import java.util.Optional;

import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.shop.exceptions.DoesNotExistException;
import com.example.demo.shop.model.CustomerInfo;
import com.example.demo.shop.service.CustomerServiceImpl;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class CustomerController {

	@Autowired
	private CustomerServiceImpl customerService;

	@GetMapping("customers")
	public List<CustomerInfo> searchForCustomers(@RequestParam("username") Optional<String> username,
			KeycloakPrincipal<KeycloakSecurityContext> principal) throws DoesNotExistException {
		if (username.isPresent()) {
			return customerService.getCustomerByUsername(username.get(), principal);
		}

		return customerService.getCustomers(principal);
	}

}
