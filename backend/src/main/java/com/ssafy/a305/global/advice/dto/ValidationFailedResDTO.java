package com.ssafy.a305.global.advice.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ValidationFailedResDTO {
	private List<ValidationErrorDTO> errors;
}
