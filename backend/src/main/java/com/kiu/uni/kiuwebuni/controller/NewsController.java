package com.kiu.uni.kiuwebuni.controller;

import com.kiu.uni.kiuwebuni.dto.NewsDto;
import com.kiu.uni.kiuwebuni.responsedto.ResponseDto;
import com.kiu.uni.kiuwebuni.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/university/admin/news")
public class NewsController {
    @Autowired
    private NewsService newsService;

    @PostMapping("/save")
    public ResponseDto save(@RequestBody NewsDto newsDto) {
        return newsService.insertData(newsDto);
    }

    @GetMapping("/all")
    public ResponseDto get() {
        return newsService.getAll();
    }

    @PutMapping("/update")
    public ResponseDto edit(@RequestBody NewsDto newsDto) {
        return newsService.editNews(newsDto);
    }

    @GetMapping("/getbyid/{id}")
    public ResponseDto gettingOneUser(@PathVariable int id) {
        return newsService.getById(id);
    }
}


