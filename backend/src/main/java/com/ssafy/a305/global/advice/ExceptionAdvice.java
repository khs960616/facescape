package com.ssafy.a305.global.advice;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ssafy.a305.auth.exception.LoginException;
import com.ssafy.a305.global.advice.dto.ValidationErrorDTO;
import com.ssafy.a305.global.advice.dto.ValidationFailedResDTO;
import com.ssafy.a305.member.exception.DuplicatedEmailException;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class ExceptionAdvice {

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity unknownException(RuntimeException e) {
		log.error("Unknown server exception : ", e);
		return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(NoSuchElementException.class)
	public ResponseEntity noSuchElementException(NoSuchElementException e) {
		log.error("exception : ", e);
		return new ResponseEntity(HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity methodArgumentNotValidException(MethodArgumentNotValidException e) {
		log.error("exception : ", e);

		//에러는 field, errorMessage로 이루어진 객체의 배열로 전달
		List<ValidationErrorDTO> errorList = e.getBindingResult().getAllErrors()
			.stream()
			.map(error -> new ValidationErrorDTO(((FieldError)error).getField(), error.getDefaultMessage()))
			.collect(Collectors.toList());

		return new ResponseEntity<>(new ValidationFailedResDTO(errorList), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(DuplicatedEmailException.class)
	public ResponseEntity duplicatedEmailException(DuplicatedEmailException e) {
		log.error("exception : ", e);
		List<ValidationErrorDTO> errorList = new ArrayList<>();
		errorList.add(new ValidationErrorDTO("email", "이미 회원가입된 회원입니다."));
		return new ResponseEntity<>(new ValidationFailedResDTO(errorList), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(LoginException.class)
	public ResponseEntity loginException(LoginException e) {
		log.error("exception : ", e);
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}
}
