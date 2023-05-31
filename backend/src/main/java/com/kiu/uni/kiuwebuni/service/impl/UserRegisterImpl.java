package com.kiu.uni.kiuwebuni.service.impl;

import com.kiu.uni.kiuwebuni.dto.UserRegisterDto;
import com.kiu.uni.kiuwebuni.model.UserRegisterEntity;
import com.kiu.uni.kiuwebuni.repository.UserRegisterRepository;
import com.kiu.uni.kiuwebuni.responsedto.ResponseDto;
import com.kiu.uni.kiuwebuni.service.UserRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserRegisterImpl implements UserRegisterService {
    @Autowired
    private UserRegisterRepository userRegisterRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public ResponseDto insert(UserRegisterDto userRegisterDto) {
        ResponseDto responseDto=new ResponseDto();
        UserRegisterEntity userRegisterEntity=new UserRegisterEntity();
        userRegisterEntity.setEmail(userRegisterDto.getEmail());
        userRegisterEntity.setPassword(bCryptPasswordEncoder.encode(userRegisterDto.getPassword()));
        userRegisterRepository.save(userRegisterEntity);
        responseDto.setCode(200);
        responseDto.setMzg("Inserted User");
        return responseDto;
    }

    @Override
    public ResponseDto delete(Integer id) {
        ResponseDto responseDto=new ResponseDto();
        userRegisterRepository.deleteById(id);
        responseDto.setCode(200);
        responseDto.setMzg("Successfully deleted");
        return  responseDto;
    }

    @Override
    public ResponseDto login(UserRegisterDto userRegisterDto) {
        ResponseDto responseDto =new ResponseDto();
        UserRegisterEntity userRegisterEntity=userRegisterRepository.findByEmail(userRegisterDto.getEmail());
        if(userRegisterEntity !=null){
            String password=userRegisterDto.getPassword();
            String encodedPassword=userRegisterEntity.getPassword();
            boolean isPwdRight=bCryptPasswordEncoder.matches(password,encodedPassword);
            if(isPwdRight){
                Optional<UserRegisterEntity> optionalUserRegisterEntity=userRegisterRepository.findOneByEmailAndPassword(userRegisterDto.getEmail(),encodedPassword);
                if(optionalUserRegisterEntity.isPresent()){
                    responseDto.setCode(200);
                    responseDto.setMzg("Login Success");
                    return responseDto;
                }else {
                    responseDto.setCode(404);
                    responseDto.setMzg("Login Failed");
                    return responseDto;
                }
            }else {
                responseDto.setCode(300);
                responseDto.setMzg("Error password doesn't match");
                return responseDto;
            }
        }else {
            responseDto.setCode(404);
            responseDto.setMzg("Email not exists");
            return responseDto;
        }

    }
}
