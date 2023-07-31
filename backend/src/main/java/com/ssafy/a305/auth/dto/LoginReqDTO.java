package com.ssafy.a305.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginReqDTO {
	@NotBlank
	private String email;
	@NotBlank
	private String password;
}
