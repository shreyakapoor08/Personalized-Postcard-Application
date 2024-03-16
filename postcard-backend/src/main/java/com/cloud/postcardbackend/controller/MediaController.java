package com.cloud.postcardbackend.controller;

import com.cloud.postcardbackend.entity.MediaEntity;
import com.cloud.postcardbackend.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin
public class MediaController {

    @Autowired
    private MediaService mediaService;

    @PostMapping("/upload-media")
    public Long uploadMedia(@RequestParam("file-document") MultipartFile file1, @RequestParam("file-image") MultipartFile file2) throws IOException {
        return mediaService.uploadMedia(file1, file2);
    }

    @GetMapping("/media/{id}")
    public ResponseEntity<MediaEntity> getMediaById(@PathVariable Long id) {
        MediaEntity mediaEntity = mediaService.getMediaById(id);
        return ResponseEntity.ok().body(mediaEntity);
    }


}
