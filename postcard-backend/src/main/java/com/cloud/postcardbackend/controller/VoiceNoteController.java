package com.cloud.postcardbackend.controller;

import com.cloud.postcardbackend.service.VoiceNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class VoiceNoteController {

    @Autowired
    private VoiceNoteService voiceNoteService;

    @PostMapping("/upload-voice-note")
    public String uploadVoiceNote(@RequestParam("file") MultipartFile file) throws IOException {
        return voiceNoteService.uploadVoiceNote(file);
    }

}
