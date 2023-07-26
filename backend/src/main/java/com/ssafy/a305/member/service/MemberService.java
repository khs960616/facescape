package com.ssafy.a305.member.service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.NoSuchElementException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.a305.member.domain.LoginType;
import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.member.dto.MemberInfoResDTO;
import com.ssafy.a305.member.dto.MemberInfoUpdateReqDTO;
import com.ssafy.a305.member.dto.SignUpReqDTO;
import com.ssafy.a305.member.dto.UniqueEmailCheckResDTO;
import com.ssafy.a305.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;

	public UniqueEmailCheckResDTO checkPreExistEmail(String email) {
		return new UniqueEmailCheckResDTO(!memberRepository.existsByEmail(email));
	}

	public MemberInfoResDTO getMemberInfo(Integer id) {
		//id로 검색 시 존재하지 않는 회원일 경우 예외 throw
		Member member = memberRepository.findById(id).orElseThrow(NoSuchElementException::new);
		Timestamp timestamp = member.getRecentLogin();
		String formattedDate = new SimpleDateFormat("yyyy-MM-dd HH:mm").format(timestamp);
		return new MemberInfoResDTO(member.getEmail(), member.getNickname(), member.getMileage(),
			formattedDate);
	}

	public void updateMemberInfo(Integer id, MemberInfoUpdateReqDTO dto) {
		Member member = memberRepository.findById(id).orElseThrow(NoSuchElementException::new);
		String nickname = dto.getNickname();
		String password = dto.getPassword();
		if (nickname != null) {
			member.updateNickname(nickname);
		} else if (password != null) {
			member.updatePassword(password);
		}
		memberRepository.save(member);
	}

	public void signUpMember(SignUpReqDTO dto) {
		Member member = Member.builder()
			.email(dto.getEmail())
			.password(passwordEncoder.encode(dto.getPassword()))
			.nickname(dto.getNickname())
			.loginType(LoginType.LOCAL)
			.build();

		memberRepository.save(member);
	}
}
