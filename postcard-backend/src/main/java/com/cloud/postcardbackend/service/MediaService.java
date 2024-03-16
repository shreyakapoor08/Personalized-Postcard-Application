package com.cloud.postcardbackend.service;

import com.cloud.postcardbackend.entity.MediaEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface MediaService {
    Long uploadMedia(MultipartFile file1, MultipartFile file2) throws IOException;
    MediaEntity getMediaById(Long id);
}