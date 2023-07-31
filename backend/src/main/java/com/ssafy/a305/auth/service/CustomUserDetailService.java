package com.ssafy.a305.auth.service;

import java.util.NoSuchElementException;
import java.util.function.Supplier;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.a305.auth.domain.MemberDetails;
import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

	private final MemberRepository memberRepository;

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Supplier<NoSuchElementException> notExistMemberLogSupplier = () -> {
			log.info("Member name: {} not exist", username);
			return new NoSuchElementException();
		};

		Member member = memberRepository.findByEmail(username).orElseThrow(notExistMemberLogSupplier);
		return new MemberDetails(member.getId(), member.getEmail(), member.getPassword());
	}
}
