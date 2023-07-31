package com.ssafy.a305.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.a305.auth.dto.LoginReqDTO;
import com.ssafy.a305.auth.dto.LoginResDTO;
import com.ssafy.a305.auth.util.JWTUtils;

import javax.validation.Valid;

@RestController
public class AuthController {

	private final String TOKEN_TYPE;
	private final AuthenticationManager authenticationManager;
	private final JWTUtils jwtUtils;

	@Autowired
	public AuthController(@Value("${jwt.tokenType}") String tokenType, AuthenticationManager authenticationManager,
		JWTUtils jwtUtils) {
		this.TOKEN_TYPE = tokenType;
		this.authenticationManager = authenticationManager;
		this.jwtUtils = jwtUtils;
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResDTO> login(@RequestBody @Valid LoginReqDTO loginReqDTO) {
		Authentication authenticate = authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(loginReqDTO.getEmail(), loginReqDTO.getPassword()));

		String accessToken = jwtUtils.generateAccessToken(authenticate);
		return ResponseEntity.ok(new LoginResDTO(TOKEN_TYPE, accessToken));
	}
}
