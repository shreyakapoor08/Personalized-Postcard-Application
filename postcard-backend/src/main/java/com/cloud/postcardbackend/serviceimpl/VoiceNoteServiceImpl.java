package com.cloud.postcardbackend.serviceimpl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.cloud.postcardbackend.entity.VoiceNote;
import com.cloud.postcardbackend.repository.VoiceNoteRepository;
import com.cloud.postcardbackend.service.VoiceNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class VoiceNoteServiceImpl implements VoiceNoteService {

    @Autowired
    private AmazonS3 amazonS3;

    @Autowired
    private VoiceNoteRepository voiceNoteRepository;

    @Override
    public String uploadVoiceNote(MultipartFile file) throws IOException {
        String key = "voice-notes/" + UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

        amazonS3.putObject(new PutObjectRequest("cloud-media-upload", key, file.getInputStream(), null)
                .withCannedAcl(CannedAccessControlList.PublicRead));

        String voiceNoteUrl = amazonS3.getUrl("cloud-media-upload", key).toString();

        VoiceNote voiceNote = new VoiceNote();
        voiceNote.setUrl(voiceNoteUrl);
        voiceNoteRepository.save(voiceNote);

        return "Voice Note uploaded successfully! URL: " + voiceNoteUrl;
    }
}
