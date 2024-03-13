package com.cloud.postcardbackend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DocumentService {
    String uploadDocument(MultipartFile file) throws IOException;
    String getDocumentUrlById(Long id);
}