package com.ssafy.a305.item.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name = "ItemType")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemType {

    @Id
    @Column(name = "item_type_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false, length = 32)
    private String name;
}
