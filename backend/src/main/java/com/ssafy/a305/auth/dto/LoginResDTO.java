package com.ssafy.a305.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResDTO {
	private String tokenType;
	private String accessToken;
}
