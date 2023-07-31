package com.ssafy.a305.record.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RecordReqDTO {
	private List<MemberInfoForRecordDTO> members;
	private String clearDate;
	private Integer clearTime;
	private Integer stage;
}
