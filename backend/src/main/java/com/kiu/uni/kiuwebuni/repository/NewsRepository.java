package com.kiu.uni.kiuwebuni.repository;

import com.kiu.uni.kiuwebuni.model.NewsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<NewsEntity,Integer> {
}
