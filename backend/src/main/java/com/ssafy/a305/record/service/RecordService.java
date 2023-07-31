package com.ssafy.a305.record.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.member.repository.MemberRepository;
import com.ssafy.a305.record.domain.GameParticipant;
import com.ssafy.a305.record.domain.GameRecord;
import com.ssafy.a305.record.dto.MemberInfoForRecordDTO;
import com.ssafy.a305.record.dto.RecordReqDTO;
import com.ssafy.a305.record.repository.GameParticipantRepository;
import com.ssafy.a305.record.repository.GameRecordRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecordService {

	private final GameRecordRepository gameRecordRepository;
	private final GameParticipantRepository gameParticipantRepository;
	private final MemberRepository memberRepository;

	@Transactional // 중간에 실패 시 롤백
	public void saveRecord(RecordReqDTO dto) {
		//game_record 생성 및 저장
		String date = dto.getClearDate();
		Timestamp timestamp = Timestamp.valueOf(date);
		GameRecord gameRecord = GameRecord.builder()
			.clearDate(timestamp)
			.clearTime(dto.getClearTime())
			.stage(dto.getStage())
			.build();
		gameRecord = gameRecordRepository.save(gameRecord);

		//게임에 참가한 game_participant 생성 및 저장
		List<MemberInfoForRecordDTO> participants = dto.getMembers();
		List<Integer> participantsId = participants
			.stream()
			.map(MemberInfoForRecordDTO::getMemberId)
			.collect(Collectors.toList());
		Map<Integer, Member> memberMap = getExistMembersIdMapByParticipantsId(participantsId);
		List<GameParticipant> gameParticipants = getGameParticipantsWithExistMembersMap(memberMap, participants,
			gameRecord);
		gameParticipantRepository.saveAll(gameParticipants);
	}

	//참여자 id 중 db에 존재하는 회원 정보를 Map으로 반환하는 메서드
	private Map<Integer, Member> getExistMembersIdMapByParticipantsId(List<Integer> participantsId) {
		List<Member> existMembers = memberRepository.findByIdIn(participantsId);
		Map<Integer, Member> hmap = new HashMap<>();
		for (Member member : existMembers) {
			hmap.put(member.getId(), member);
		}
		return hmap;
	}

	// 게임 참여자 엔티티 형식에 맞게 List 반환하는 메서드
	// 비회원 혹은 존재하지 않는 id의 회원은 게임 기록 번호와 닉네임만 저장(member_id : null)
	private List<GameParticipant> getGameParticipantsWithExistMembersMap(Map<Integer, Member> memberMap,
		List<MemberInfoForRecordDTO> participants, GameRecord gameRecord) {
		List<GameParticipant> gameParticipants = new ArrayList<>();
		for (MemberInfoForRecordDTO participant : participants) {
			Member member = memberMap.get(participant.getMemberId());
			gameParticipants.add(GameParticipant.builder()
				.member(member)
				.gameRecord(gameRecord)
				.nickname(participant.getNickname())
				.build());
			;
		}
		return gameParticipants;
	}
}