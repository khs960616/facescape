package com.ssafy.a305.member.dto;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SignUpReqDTO {
	@Pattern(regexp = "^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$", message = "정확한 이메일 주소를 입력하세요.")
	@Size(min = 8, max = 320, message = "이메일 글자수를 확인하세요.")
	private String email;
	@Size(min = 8, max = 64, message = "8자 이상, 64자 이하의 암호를 입력해주세요.")
	private String password;
	@Pattern(regexp = "^[ㄱ-ㅎ가-힣a-zA-Z0-9]*$", message = "닉네임에는 특수문자, 공백을 포함할 수 없습니다.")
	@Size(min = 1, max = 8, message = "1자 이상, 8자 이하의 닉네임을 입력해주세요.")
	private String nickname;
}
