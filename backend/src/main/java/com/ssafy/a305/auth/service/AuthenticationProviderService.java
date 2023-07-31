package com.ssafy.a305.auth.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.a305.auth.domain.MemberDetails;
import com.ssafy.a305.auth.exception.LoginException;
import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthenticationProviderService implements AuthenticationProvider {

	private final UserDetailsService userDetailService;
	private final PasswordEncoder passwordEncoder;
	private final MemberRepository memberRepository;

	@Override
	@Transactional
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String email = authentication.getPrincipal().toString();
		String rawPassword = authentication.getCredentials().toString();
		MemberDetails memberDetails = (MemberDetails)userDetailService.loadUserByUsername(email);
		if (!passwordEncoder.matches(rawPassword, memberDetails.getPassword())) {
			log.debug("Member: {}, password not match exception", email);
			throw new LoginException();
		}

		Member member = memberRepository.findById(memberDetails.getId()).orElseThrow(
			NoSuchElementException::new);
		member.updateRecentLogin();
		return new UsernamePasswordAuthenticationToken(memberDetails.getId(), "", List.of(() -> "USER"));
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
}
