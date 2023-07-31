package com.ssafy.a305.mileage.repository;

import com.ssafy.a305.mileage.domain.MileageHistory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MileageHistoryRepository extends JpaRepository<MileageHistory, Integer> {

}
