package com.example.demo.shop.exceptions;

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
