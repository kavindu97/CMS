package com.kiu.uni.kiuwebuni.service.impl;

import com.kiu.uni.kiuwebuni.dto.NewsDto;
import com.kiu.uni.kiuwebuni.model.NewsEntity;
import com.kiu.uni.kiuwebuni.repository.NewsRepository;
import com.kiu.uni.kiuwebuni.responsedto.ResponseDto;
import com.kiu.uni.kiuwebuni.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsServiceImpl implements NewsService {
    @Autowired
    private NewsRepository newsRepository;

    public ResponseDto insertData(NewsDto newsDto){
        ResponseDto responseDto = new ResponseDto();
        try {

            NewsEntity newsEntity = new NewsEntity();
            newsEntity.setContent(newsDto.getContent());
            newsEntity.setThumbnail(newsDto.getThumbnail());
            newsEntity.setTags(newsDto.getTags());
            newsEntity.setAuthor(newsDto.getAuthor());
            newsEntity.setTags(newsDto.getTags());
            newsEntity.setTitle(newsDto.getTitle());
            newsRepository.save(newsEntity);
            responseDto.setCode(200);
            responseDto.setMzg("Data inserted");
            return responseDto;
        }catch (Exception e){
            responseDto.setCode(500);
            responseDto.setMzg("Noted inserted data");
            return responseDto;
        }

    }

    @Override
    public ResponseDto getAll() {
        ResponseDto responseDto=new ResponseDto();
        List <NewsEntity> getting=newsRepository.findAll();
        responseDto.setCode(200);
        responseDto.setData(getting);
        responseDto.setMzg("all data");
        return  responseDto;

    }

    @Override
    public ResponseDto editNews(NewsDto newsDto) {
        ResponseDto responseDto =new ResponseDto();
        try{
        Optional<NewsEntity> optionalNewsEntity=newsRepository.findById(newsDto.getId());
        if(optionalNewsEntity.isPresent()){
            NewsEntity newsEntity=optionalNewsEntity.get();
            if(newsDto.getTitle()!=null){
                newsEntity.setTitle(newsDto.getTitle());
            }
            if(newsDto.getTags()!=null) {
                newsEntity.setTags(newsDto.getTags());
            }
            if(newsDto.getContent()!=null) {
                newsEntity.setContent(newsDto.getContent());
            }
            if(newsDto.getThumbnail()!=null) {
                newsEntity.setThumbnail(newsDto.getThumbnail());
            }
            if(newsDto.getAuthor()!=null) {
                newsEntity.setAuthor(newsDto.getAuthor());
            }
        newsRepository.save(newsEntity);
        responseDto.setCode(200);
        responseDto.setMzg("Data updated");
        return  responseDto;

        }else{
            responseDto.setCode(404);
            responseDto.setMzg("post not identified");
            return  responseDto;
        }

        }catch (Exception e){
            responseDto.setCode(500);
            responseDto.setMzg("Internal Server Error");
            return  responseDto;

        }
    }

    @Override
    public ResponseDto getById(int id) {
        ResponseDto responseDto=new ResponseDto();
    Optional<NewsEntity>  newsEntitie= newsRepository.findById(id);
       responseDto.setCode(200);
       responseDto.setMzg("show data");
       responseDto.setData(newsEntitie);
       return  responseDto;
    }
}
