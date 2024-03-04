package com.cloud.postcardbackend.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface ImageService {
    String uploadImage(MultipartFile file) throws IOException;
    String getImageUrlById(Long id);
}