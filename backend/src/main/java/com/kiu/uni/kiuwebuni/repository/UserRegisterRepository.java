package com.kiu.uni.kiuwebuni.repository;

import com.kiu.uni.kiuwebuni.model.UserRegisterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRegisterRepository extends JpaRepository<UserRegisterEntity,Integer> {
    UserRegisterEntity findByEmail(String email);
    Optional <UserRegisterEntity>findOneByEmailAndPassword(String email,String password);
}
