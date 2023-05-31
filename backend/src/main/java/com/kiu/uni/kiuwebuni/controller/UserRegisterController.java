package com.kiu.uni.kiuwebuni.controller;

import com.kiu.uni.kiuwebuni.dto.UserRegisterDto;
import com.kiu.uni.kiuwebuni.responsedto.ResponseDto;
import com.kiu.uni.kiuwebuni.service.UserRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/university/admin")
public class UserRegisterController {
    @Autowired
    private UserRegisterService userRegisterService;

    @PostMapping("/insert")
    public ResponseDto saveUser(@RequestBody UserRegisterDto userRegisterDto) {
        return userRegisterService.insert(userRegisterDto);
    }
    @PostMapping("/login")
    public ResponseDto loginUser(@RequestBody UserRegisterDto userRegisterDto){
        return  userRegisterService.login(userRegisterDto);
    }
}
