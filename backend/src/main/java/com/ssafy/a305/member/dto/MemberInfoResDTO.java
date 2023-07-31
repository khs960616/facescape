package com.ssafy.a305.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberInfoResDTO {
	private String email;
	private String nickname;
	private Integer mileage;
	private String recentLogin;
}
