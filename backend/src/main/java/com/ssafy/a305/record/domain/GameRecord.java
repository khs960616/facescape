package com.ssafy.a305.record.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "game_record")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameRecord {
	@Id
	@Column(name = "game_record_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name = "clear_date", nullable = false)
	private Timestamp clearDate;
	@Column(name = "clear_time", nullable = false)
	private Integer clearTime;
	@Column(name = "stage", nullable = false)
	private Integer stage;
}
