package com.ssafy.a305.record.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.a305.record.dto.RecordReqDTO;
import com.ssafy.a305.record.service.RecordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RecordController {

	private final RecordService recordService;

	@PostMapping("/game-record")
	public ResponseEntity<Void> saveRecord(@RequestBody RecordReqDTO dto) {
		recordService.saveRecord(dto);
		return ResponseEntity.ok().build();
	}
}
