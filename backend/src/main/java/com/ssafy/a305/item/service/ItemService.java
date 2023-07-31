package com.ssafy.a305.item.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.a305.item.domain.Item;
import com.ssafy.a305.item.dto.ItemElementDTO;
import com.ssafy.a305.item.dto.ItemsReqDTO;
import com.ssafy.a305.item.dto.ItemsResDTO;
import com.ssafy.a305.item.repository.ItemRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemService {

	private final ItemRepository itemRepository;

	@Transactional(readOnly = true)
	public ItemsResDTO getItems(ItemsReqDTO dto) {
		Page<Item> items = itemRepository.findByItemsByDTO(dto);
		List<ItemElementDTO> itemElements = items.getContent().stream()
			.map(ItemElementDTO::new)
			.collect(Collectors.toList());
		return new ItemsResDTO(itemElements, items.getNumber(), items.getTotalPages(), items.isLast());
	}
}
