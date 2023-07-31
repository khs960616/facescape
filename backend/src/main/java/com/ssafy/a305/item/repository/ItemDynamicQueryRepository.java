package com.ssafy.a305.item.repository;

import com.ssafy.a305.item.domain.Item;
import com.ssafy.a305.item.dto.ItemsReqDTO;
import org.springframework.data.domain.Page;

public interface ItemDynamicQueryRepository {
    Page<Item> findByItemsByDTO(ItemsReqDTO dto);
}
