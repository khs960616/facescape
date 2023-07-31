package com.ssafy.a305.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.a305.member.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
	boolean existsByEmail(String email);

	Optional<Member> findByEmail(String email);

	List<Member> findByIdIn(List<Integer> memberIds);
}
