package com.ssafy.a305.member.controller;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.a305.member.dto.MemberInfoResDTO;
import com.ssafy.a305.member.dto.MemberInfoUpdateReqDTO;
import com.ssafy.a305.member.dto.SignUpReqDTO;
import com.ssafy.a305.member.dto.UniqueEmailCheckResDTO;
import com.ssafy.a305.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;

	@GetMapping("/check-email")
	public ResponseEntity<UniqueEmailCheckResDTO> checkPreExistEmail(@RequestParam String email) {
		return ResponseEntity.ok(memberService.checkPreExistEmail(email));
	}

	@GetMapping("/member")
	public ResponseEntity<MemberInfoResDTO> getMemberInfo(Authentication authentication) {
		return ResponseEntity.ok(memberService.getMemberInfo(Integer.parseInt(authentication.getName())));
	}

	@PatchMapping("/member")
	public ResponseEntity<Void> updateMemberInfo(@RequestBody @Valid MemberInfoUpdateReqDTO dto,
		Authentication authentication) {
		memberService.updateMemberInfo(Integer.parseInt(authentication.getName()), dto);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/member")
	public ResponseEntity<Void> signUpMember(@RequestBody @Valid SignUpReqDTO dto) {
		memberService.signUpMember(dto);
		return ResponseEntity.created(URI.create("/member")).build();
	}

	@DeleteMapping("/member")
	public ResponseEntity<Void> deleteMember(Authentication authentication) {
		memberService.deleteMember(Integer.parseInt(authentication.getName()));
		return ResponseEntity.ok().build();
	}
}
