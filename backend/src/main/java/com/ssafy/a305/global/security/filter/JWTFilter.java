package com.ssafy.a305.global.security.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import com.ssafy.a305.auth.util.JWTUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JWTFilter extends GenericFilterBean {

	private final String HEADER_NAME;
	private final String TOKEN_TYPE;
	private final JWTUtils jwtUtils;

	@Autowired
	public JWTFilter(@Value("${jwt.header}") String header,
		@Value("${jwt.tokenType}") String tokenType, JWTUtils jwtUtils) {

		this.HEADER_NAME = header;
		this.TOKEN_TYPE = tokenType;
		this.jwtUtils = jwtUtils;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
		IOException,
		ServletException {

		HttpServletRequest httpServletRequest = (HttpServletRequest)request;
		String accessToken = resolveToken(httpServletRequest);

		if (accessToken != null && jwtUtils.validateToken(accessToken)) {
			Authentication authentication = jwtUtils.getAuthentication(accessToken);
			SecurityContextHolder.getContext().setAuthentication(authentication);
		} else {
			log.debug("Not found member access token. Request uri: {}", httpServletRequest.getRequestURI());
		}
		chain.doFilter(request, response);
	}

	private String resolveToken(HttpServletRequest request) {
		String accessToken = request.getHeader(HEADER_NAME);
		if (StringUtils.hasText(accessToken) && accessToken.startsWith(TOKEN_TYPE)) {
			return accessToken.substring(7);
		}
		return null;
	}
}
