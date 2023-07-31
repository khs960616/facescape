package com.ssafy.a305.item.repository;

import com.ssafy.a305.item.domain.Item;
import com.ssafy.a305.item.domain.ItemType;
import com.ssafy.a305.item.dto.ItemsReqDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class ItemDynamicQueryRepositoryImpl implements ItemDynamicQueryRepository {

    private final EntityManager entityManager;

    @Override
    public Page<Item> findByItemsByDTO(ItemsReqDTO dto) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Item> cq = cb.createQuery(Item.class);

        Root<Item> root = cq.from(Item.class);
        Join<Item, ItemType> itemTypes = root.join("itemType", JoinType.INNER);
        List<Predicate> predicates = new ArrayList<>();

        // 아이템 카테고리(타입) 쿼리 조건 동적 추가
        String searchItemType = dto.getItemType();
        if(searchItemType != null && !searchItemType.isEmpty()) {
            predicates.add(cb.equal(itemTypes.get("name"), searchItemType));
        }

        // 아이템명 쿼리 조건 동적 추가
        String itemName = dto.getKeyword();
        if(itemName!=null && !itemName.isEmpty()) {
            predicates.add(cb.like(root.get("name"), "%"+itemName+"%"));
        }

        cq.where(predicates.toArray(new Predicate[0]));
        cq.orderBy(cb.desc(root.get("id")));

        TypedQuery<Item> query = entityManager.createQuery(cq);
        Pageable pageable = PageRequest.of(dto.getCurrentPage(), dto.getSize());
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());
        List<Item> items = query.getResultList();

        Query countQuery = entityManager.createQuery("select count(i.id) from Item i");
        long totalCount = (long) countQuery.getSingleResult();
        return new PageImpl<>(items, pageable, totalCount);
    }
}
