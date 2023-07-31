package com.ssafy.a305.record.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.a305.record.domain.GameParticipant;

public interface GameParticipantRepository extends JpaRepository<GameParticipant, Integer> {
}
