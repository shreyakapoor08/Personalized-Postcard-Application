package com.cloud.postcardbackend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface VoiceNoteService {
    String uploadVoiceNote(MultipartFile file) throws IOException;
}