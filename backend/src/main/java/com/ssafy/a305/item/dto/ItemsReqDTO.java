package com.ssafy.a305.item.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemsReqDTO {

    private Integer currentPage;
    private Integer size;
    private String itemType;
    private String keyword;
}
