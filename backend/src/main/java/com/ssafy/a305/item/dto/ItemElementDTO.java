package com.ssafy.a305.item.dto;

import com.ssafy.a305.item.domain.Item;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ItemElementDTO {

    private Integer itemId;
    private String name;
    private String image;
    private Integer price;

    public ItemElementDTO(Item item) {
        this.itemId = item.getId();
        this.name = item.getName();
        this.image = item.getImage();
        this.price = item.getPrice();
    }
}
