package com.example.demo.shop.service;

import java.net.URI;
import java.util.Arrays;
import java.util.List;

import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.example.demo.shop.exceptions.DoesNotExistException;
import com.example.demo.shop.model.CustomerInfo;

@Component
public class CustomerServiceImpl {

	@Value("${keycloak.auth-server-url}")
	private String keycloakServerUrl;

	@Value("${keycloak.realm}")
	private String keycloakRealm;

	public CustomerServiceImpl() {
	}

	public List<CustomerInfo> getCustomerByUsername(String username,
			KeycloakPrincipal<KeycloakSecurityContext> principal) throws DoesNotExistException {
		KeycloakSecurityContext context = principal.getKeycloakSecurityContext();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + context.getTokenString());

		StringBuilder sb = new StringBuilder(keycloakServerUrl);
		sb.append("/admin/realms/").append(keycloakRealm).append("/users");
		sb.append("?username=").append(username);

		HttpEntity<String> entity = new HttpEntity<String>(headers);
		RestTemplate restTemplate = new RestTemplate();
		CustomerInfo[] users = restTemplate
				.exchange(URI.create(sb.toString()), HttpMethod.GET, entity, CustomerInfo[].class).getBody();
		if (users.length == 0) {
			throw new DoesNotExistException(username);
		}

		return Arrays.asList(Arrays.stream(users).toArray(CustomerInfo[]::new));
	}

	public List<CustomerInfo> getCustomers(KeycloakPrincipal<KeycloakSecurityContext> principal) {
		KeycloakSecurityContext context = principal.getKeycloakSecurityContext();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + context.getTokenString());

		StringBuilder sb = new StringBuilder(keycloakServerUrl);
		sb.append("/admin/realms/").append(keycloakRealm).append("/users");

		HttpEntity<String> entity = new HttpEntity<String>(headers);
		RestTemplate restTemplate = new RestTemplate();
		List<CustomerInfo> users = restTemplate.exchange(URI.create(sb.toString()), HttpMethod.GET, entity,
				new ParameterizedTypeReference<List<CustomerInfo>>() {
				}).getBody();

		return users;
	}

}
