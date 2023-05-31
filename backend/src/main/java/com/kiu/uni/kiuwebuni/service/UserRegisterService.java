package com.kiu.uni.kiuwebuni.service;

import com.kiu.uni.kiuwebuni.dto.UserRegisterDto;
import com.kiu.uni.kiuwebuni.responsedto.ResponseDto;

public interface UserRegisterService {

    ResponseDto insert(UserRegisterDto userRegisterDto);
    ResponseDto delete(Integer id);
    ResponseDto login(UserRegisterDto userRegisterDto);
}
