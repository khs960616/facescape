package com.ssafy.a305.memberitem.exception;

public class MileageInsufficientException extends RuntimeException {
	public MileageInsufficientException() {
		super("마일리지가 부족하여 구매할 수 없습니다.");
	}

	public MileageInsufficientException(String message) {
		super(message);
	}
}