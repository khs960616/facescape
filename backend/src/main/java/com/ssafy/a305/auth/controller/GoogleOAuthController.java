package com.ssafy.a305.auth.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.a305.auth.dto.LoginResDTO;
import com.ssafy.a305.auth.service.GoogleOAuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class GoogleOAuthController {
	private final GoogleOAuthService googleOAuthService;

	//구글 로그인 버튼 클릭시 로그인 창으로 리다이렉트
	@GetMapping("/login/oauth2")
	public void redirectToLoginPage(HttpServletResponse response) throws IOException {
		response.sendRedirect(googleOAuthService.getGoogleLoginUrl());
	}

	//구글 로그인 성공 후 인가 코드로 자체 로그인 작업
	@GetMapping("/login/oauth2/google")
	public ResponseEntity<LoginResDTO> googleLogin(@RequestParam String code) throws JsonProcessingException {
		return ResponseEntity.ok(googleOAuthService.googleLogin(code));
	}
}
