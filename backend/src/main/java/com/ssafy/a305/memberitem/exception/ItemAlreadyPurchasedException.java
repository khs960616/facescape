package com.ssafy.a305.memberitem.exception;

public class ItemAlreadyPurchasedException extends RuntimeException {
	public ItemAlreadyPurchasedException() {
		super("이미 구매한 아이템입니다.");
	}

	public ItemAlreadyPurchasedException(String message) {
		super(message);
	}
}