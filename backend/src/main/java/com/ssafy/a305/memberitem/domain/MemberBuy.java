package com.ssafy.a305.memberitem.domain;

import java.sql.Timestamp;

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

@Entity(name = "MemberBuy")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberBuy {

	@Id
	@Column(name = "member_buy_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "item_id")
	private Item item;

	@Column(name = "name", nullable = false, length = 32)
	private String name;

	@Column(name = "price", nullable = false)
	private Integer price;

	@Column(name = "created_at", nullable = false)
	private Timestamp createdAt;
}
