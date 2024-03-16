package com.cloud.postcardbackend.serviceimpl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.cloud.postcardbackend.entity.MediaEntity;
import com.cloud.postcardbackend.exceptions.ResourceNotFoundException;
import com.cloud.postcardbackend.repository.MediaRepository;
import com.cloud.postcardbackend.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class MediaServiceImpl implements MediaService {

    @Autowired
    private AmazonS3 amazonS3;

    @Autowired
    private MediaRepository mediaRepository;

    @Override
    public Long uploadMedia(MultipartFile file1, MultipartFile file2) throws IOException {

        String randomIdForMedia = UUID.randomUUID().toString();
        String originalFilename1 = file1.getOriginalFilename();
        String originalFilename2 = file2.getOriginalFilename();

        String fileExtension1 = originalFilename1.substring(originalFilename1.lastIndexOf("."));
        String fileExtension2 = originalFilename2.substring(originalFilename2.lastIndexOf("."));
        System.out.println("fileExtension1 ---> "+ fileExtension1);
        String key1 = "documents/" + randomIdForMedia + "-" + "document" + fileExtension1;
        String key2 = "images/" + randomIdForMedia + "-" + "image" + fileExtension2;


        amazonS3.putObject(new PutObjectRequest("cloud-media-upload", key1, file1.getInputStream(), null)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        amazonS3.putObject(new PutObjectRequest("cloud-media-upload", key2, file2.getInputStream(), null)
                .withCannedAcl(CannedAccessControlList.PublicRead));

        String documentUrl = amazonS3.getUrl("cloud-media-upload", key1).toString();
        String imageUrl = amazonS3.getUrl("cloud-media-upload", key2).toString();

        MediaEntity mediaEntity = new MediaEntity();
        mediaEntity.setDocumentUrl(documentUrl);
        mediaEntity.setImageUrl(imageUrl);
        mediaRepository.save(mediaEntity);
        return mediaRepository.save(mediaEntity).getId();
    }

    @Override
    public MediaEntity getMediaById(Long id) {
        return mediaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Media not found with id: " + id));
    }


}
