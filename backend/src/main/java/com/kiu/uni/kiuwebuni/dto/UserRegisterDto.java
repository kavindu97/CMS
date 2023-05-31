package com.kiu.uni.kiuwebuni.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude
public class UserRegisterDto {
    private Integer id;
    private String email;
    private String password;
}
