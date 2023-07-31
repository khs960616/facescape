package com.ssafy.a305.auth.exception;

import org.springframework.security.core.AuthenticationException;

public class LoginException extends AuthenticationException {
	public LoginException() {
		super("아이디 또는 비밀번호가 틀렸습니다.");
	}
}
