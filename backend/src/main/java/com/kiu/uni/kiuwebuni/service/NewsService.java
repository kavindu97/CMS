package com.kiu.uni.kiuwebuni.service;

import com.kiu.uni.kiuwebuni.dto.NewsDto;
import com.kiu.uni.kiuwebuni.responsedto.ResponseDto;

public interface NewsService {
    ResponseDto insertData(NewsDto newsDto);
    ResponseDto getAll();

    ResponseDto editNews(NewsDto newsDto);
    ResponseDto getById(int id);
}
