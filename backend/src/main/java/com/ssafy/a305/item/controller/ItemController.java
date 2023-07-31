package com.ssafy.a305.item.controller;

import com.ssafy.a305.item.dto.ItemsReqDTO;
import com.ssafy.a305.item.dto.ItemsResDTO;
import com.ssafy.a305.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping("/items")
    public ResponseEntity<ItemsResDTO> getItems(ItemsReqDTO dto) {
        return ResponseEntity.ok(itemService.getItems(dto));
    }
}
