package com.cloud.postcardbackend.serviceimpl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.cloud.postcardbackend.entity.DocumentEntity;
import com.cloud.postcardbackend.exceptions.ResourceNotFoundException;
import com.cloud.postcardbackend.repository.DocumentRepository;
import com.cloud.postcardbackend.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    private AmazonS3 amazonS3;

    @Autowired
    private DocumentRepository documentRepository;

    @Override
    public String uploadDocument(MultipartFile file) throws IOException {
        String key = "documents/" + UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

        amazonS3.putObject(new PutObjectRequest("cloud-media-upload", key, file.getInputStream(), null)
                .withCannedAcl(CannedAccessControlList.PublicRead));

        String documentUrl = amazonS3.getUrl("cloud-media-upload", key).toString();

        DocumentEntity documentEntity = new DocumentEntity();
        documentEntity.setUrl(documentUrl);
        documentRepository.save(documentEntity);

        return "Document uploaded successfully! URL: " + documentUrl;
    }

    @Override
    public String getDocumentUrlById(Long id) {
        // Fetch document URL from repository based on ID
        DocumentEntity documentEntity = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));

        return documentEntity.getUrl();
    }
}
