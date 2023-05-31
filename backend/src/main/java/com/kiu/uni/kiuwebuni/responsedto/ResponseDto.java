package com.kiu.uni.kiuwebuni.responsedto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@JsonInclude
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto {
    private int code;
    private String mzg;
    private Object data;
}
