package com.ssafy.a305.auth.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class GoogleUserInfoDTO {
	private String id;
	private String email;
	private boolean verifiedEmail;
	private String name;
	private String givenName;
	private String picture;
	private String locale;

}
