package com.ssafy.a305.item.repository;

import com.ssafy.a305.item.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer>, ItemDynamicQueryRepository {
}
