package com.ssafy.a305.auth.util;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.a305.auth.dto.GoogleAccessTokenDTO;
import com.ssafy.a305.auth.dto.GoogleUserInfoDTO;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GoogleOAuthUtils {

	@Value("${oauth2.google.clientId}")
	private String GOOGLE_CLIENT_ID;
	@Value("${oauth2.google.clientSecret}")
	private String GOOGLE_CLIENT_SECRET;
	@Value("${oauth2.google.loginUrl}")
	private String GOOGLE_LOGIN_URL;
	@Value("${oauth2.google.redirectUrl}")
	private String GOOGLE_REDIRECT_URL;
	@Value("${oauth2.google.tokenUrl}")
	private String GOOGLE_TOKEN_URL;
	@Value("${oauth2.google.resourceUrl}")
	private String GOOGLE_RESOURCE_URL;
	@Value("${oauth2.google.scope}")
	private String GOOGLE_DATA_ACCESS_SCOPE;

	private final ObjectMapper objectMapper;

	private final RestTemplate restTemplate = new RestTemplateBuilder()
		.uriTemplateHandler(new DefaultUriBuilderFactory())
		.build();

	//구글 로그인으로 가는 url 생성 메서드
	public String getGoogleLoginUrl() {
		Map<String, Object> params = new HashMap<>();
		params.put("scope", GOOGLE_DATA_ACCESS_SCOPE);
		params.put("response_type", "code");
		params.put("client_id", GOOGLE_CLIENT_ID);
		params.put("redirect_uri", GOOGLE_REDIRECT_URL);

		//parameter 를 형식에 맞춰 구성
		String parameterString = params.entrySet().stream()
			.map(x -> x.getKey() + "=" + x.getValue())
			.collect(Collectors.joining("&"));
		String loginUrl = GOOGLE_LOGIN_URL + "?" + parameterString;
		System.out.println("loginUrl = " + loginUrl);

		return loginUrl;
	}

	//인가 코드로 액세스 토큰을 반환하는 메서드
	public GoogleAccessTokenDTO getAccessToken(String code) throws JsonProcessingException {
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("code", code);
		params.add("client_id", GOOGLE_CLIENT_ID);
		params.add("client_secret", GOOGLE_CLIENT_SECRET);
		params.add("redirect_uri", GOOGLE_REDIRECT_URL);
		params.add("grant_type", "authorization_code");

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		HttpEntity<Object> entity = new HttpEntity<>(params, headers);

		ResponseEntity<String> response = restTemplate.postForEntity(GOOGLE_TOKEN_URL, entity, String.class);
		System.out.println("token res = " + response.getBody());

		return objectMapper.readValue(response.getBody(), GoogleAccessTokenDTO.class);
	}

	//액세스 토큰으로 구글 사용자 정보 받는 메서드
	public GoogleUserInfoDTO getUserInfo(GoogleAccessTokenDTO accessToken) throws JsonProcessingException {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken.getAccessToken());
		System.out.println(accessToken.getAccessToken());

		HttpEntity<Object> entity = new HttpEntity<>(headers);
		ResponseEntity<String> response = restTemplate.exchange(GOOGLE_RESOURCE_URL, HttpMethod.GET, entity,
			String.class);
		System.out.println("userinfo res = " + response.getBody());

		return objectMapper.readValue(response.getBody(), GoogleUserInfoDTO.class);
	}
}
