package com.ssafy.a305.member.exception;

public class DuplicatedEmailException extends RuntimeException {
	public DuplicatedEmailException() {
		super("이미 가입된 이메일입니다.");
	}
}
