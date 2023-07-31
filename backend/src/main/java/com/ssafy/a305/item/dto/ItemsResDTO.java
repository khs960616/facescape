package com.ssafy.a305.item.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ItemsResDTO {

    private List<ItemElementDTO> items;
    private Integer currentPage;
    private Integer totalPages;
    private Boolean isLastPage;
}
