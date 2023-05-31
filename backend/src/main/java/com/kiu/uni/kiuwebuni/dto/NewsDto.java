package com.kiu.uni.kiuwebuni.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonInclude
public class NewsDto {
    private Integer id;
    private String title;
    private String content;
    private  String thumbnail;
    private String tags;
    private String author;

}
