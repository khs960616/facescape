package com.ssafy.a305.memberitem.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.a305.item.domain.Item;
import com.ssafy.a305.member.domain.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "MemberItem")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberItem {

	@Id
	@Column(name = "member_item_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "item_id")
	private Item item;

	@Column(name = "used_yn", nullable = false)
	private Boolean usedYN;

	public void updateUsedYN(Boolean usedYN) {
		this.usedYN = usedYN;
	}

}
