package com.ssafy.a305.memberitem.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.a305.item.domain.Item;
import com.ssafy.a305.item.repository.ItemRepository;
import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.member.repository.MemberRepository;
import com.ssafy.a305.memberitem.domain.MemberBuy;
import com.ssafy.a305.memberitem.domain.MemberItem;
import com.ssafy.a305.memberitem.dto.MemberItemReqDTO;
import com.ssafy.a305.memberitem.exception.ItemAlreadyPurchasedException;
import com.ssafy.a305.memberitem.exception.MileageInsufficientException;
import com.ssafy.a305.memberitem.repository.MemberBuyRepository;
import com.ssafy.a305.memberitem.repository.MemberItemRepository;
import com.ssafy.a305.mileage.service.MileageService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberItemService {

	private final MemberBuyRepository memberBuyRepository;
	private final MemberItemRepository memberItemRepository;
	private final ItemRepository itemRepository;
	private final MemberRepository memberRepository;
	private final MileageService mileageService;

	// 회원이 마일리지를 소모하여 아이템을 구매하는 메서드
	@Transactional
	public void buyItem(MemberItemReqDTO dto, Authentication authentication) {
		// item id와 member id를 통해 각 객체를 찾는다.
		Integer itemId = dto.getItemId();
		Item item = itemRepository.findById(itemId).orElseThrow(NoSuchElementException::new);

		Integer memberId = Integer.parseInt(authentication.getName());
		Member member = memberRepository.findById(memberId).orElseThrow(NoSuchElementException::new);

		// item price와 member mileage를 찾는다.
		int price = item.getPrice();
		int mileage = member.getMileage();

		// 구매가능 조건을 판별한다.
		// 1. 보유 마일리지 확인
		if (mileage < price) {
			throw new MileageInsufficientException();
		}
		// 2. 해당 아이템을 보유 여부 확인
		List<MemberItem> purchasedItems = showItem(memberId);
		for (MemberItem purchasedItem : purchasedItems) {
			if (purchasedItem.getItem().getId().equals(itemId)) {
				throw new ItemAlreadyPurchasedException();
			}
		}

		// 마일리지를 차감하고 기록을 남긴다.
		mileageService.changeMileage(memberId, mileage - price);

		// memberItemRepository에 보유 목록을 저장한다.
		MemberItem memberItem = MemberItem.builder()
			.member(member)
			.item(item)
			.usedYN(false)
			.build();
		memberItemRepository.save(memberItem);

		// memberBuyRepository에 거래 내역을 저장한다.
		MemberBuy memberBuy = MemberBuy.builder()
			.member(member)
			.item(item)
			.name(item.getName())
			.price(item.getPrice())
			.createdAt(new Timestamp(System.currentTimeMillis()))
			.build();
		memberBuyRepository.save(memberBuy);
	}

	// 회원이 구매한 모든 아이템을 반환하는 메서드
	// memberId가 일치하는 item 보유 목록을 리스트로 반환
	@Transactional(readOnly = true)
	public List<MemberItem> showItem(Integer memberId) {
		return memberItemRepository.findByMemberId(memberId);
	}

	// 회원이 아이템을 장착하고 해제하는 메서드
	@Transactional
	public void equipItem(MemberItemReqDTO dto, Authentication authentication) {
		Integer memberId = Integer.parseInt(authentication.getName());

		// memberId와 itemId로 MemberItem을 조회
		MemberItem memberItem = memberItemRepository.findByMemberIdAndItemId(memberId, dto.getItemId())
			.orElseThrow(NoSuchElementException::new);

		// usedYN 값을 변경
		boolean currentUsedYN = memberItem.getUsedYN();
		memberItem.updateUsedYN(!currentUsedYN);

		// 변경사항을 memberItemRepository에 저장
		memberItemRepository.save(memberItem);
	}

	// 회원이 장착한 모든 아이템을 반환하는 메서드
	// memberId가 일치하고 usedYN이 true인 item 목록을 리스트로 반환
	@Transactional(readOnly = true)
	public List<MemberItem> showEquippedItem(Integer memberId) {
		return memberItemRepository.findByMemberIdAndUsedYN(memberId, true);
	}

}
