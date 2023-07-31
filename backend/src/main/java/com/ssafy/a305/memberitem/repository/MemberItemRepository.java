package com.ssafy.a305.memberitem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.a305.memberitem.domain.MemberItem;

@Repository
public interface MemberItemRepository extends JpaRepository<MemberItem, Integer> {
	List<MemberItem> findByMemberId(Integer memberId);

	List<MemberItem> findByMemberIdAndUsedYN(Integer memberId, boolean usedYN);

	Optional<MemberItem> findByMemberIdAndItemId(Integer memberId, Integer itemId);

}
