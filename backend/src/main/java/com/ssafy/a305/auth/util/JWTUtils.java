package com.ssafy.a305.auth.util;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JWTUtils {
	private final Key key;
	private final long tokenDuration;

	public JWTUtils(@Value("${jwt.secret}") String secretKey, @Value("${jwt.tokenDuration}") long tokenDuration) {
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
		this.tokenDuration = tokenDuration;
	}

	public String generateAccessToken(Authentication authentication) {
		Date issuedTime = new Date();
		Date expiredTime = new Date(issuedTime.getTime() + tokenDuration);

		String memberId = authentication.getPrincipal().toString();
		String memberRoles = getMemberRoles(authentication);

		return Jwts.builder()
			.claim("id", memberId)
			.claim("role", memberRoles)
			.setIssuedAt(issuedTime)
			.setExpiration(expiredTime)
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	public Authentication getAuthentication(String accessToken) {
		Claims claims = Jwts
			.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(accessToken)
			.getBody();

		Integer memberId = Integer.parseInt((String) claims.get("id"));
		Collection<? extends GrantedAuthority> authorities =
			Arrays.stream(claims.get("role").toString().split(","))
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
		return new UsernamePasswordAuthenticationToken(memberId, accessToken, authorities);
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
			return true;
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
			log.debug("Bad sign token error", e);
		} catch (ExpiredJwtException e) {
			log.debug("Expired token error", e);
		} catch (UnsupportedJwtException e) {
			log.debug("Unsupported exception", e);
		} catch (IllegalArgumentException e) {
			log.debug("Unknown token valid exception", e);
		}
		return false;
	}

	private String getMemberRoles(Authentication authentication) {
		List<String> authorities = authentication.getAuthorities()
			.stream()
			.map(GrantedAuthority::getAuthority)
			.collect(Collectors.toList());
		return String.join(",", authorities);
	}
}
