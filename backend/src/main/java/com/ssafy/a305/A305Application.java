package com.ssafy.a305;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class A305Application {

	public static void main(String[] args) {
		SpringApplication.run(A305Application.class, args);
	}

}
