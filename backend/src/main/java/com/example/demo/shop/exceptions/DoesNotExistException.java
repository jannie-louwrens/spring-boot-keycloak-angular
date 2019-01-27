package com.example.demo.shop.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class DoesNotExistException extends Exception {

	private static final long serialVersionUID = 1L;

	public DoesNotExistException() {
	}

	public DoesNotExistException(String message) {
		super(message);
	}

	public DoesNotExistException(String message, Throwable cause) {
		super(message, cause);
	}

}
