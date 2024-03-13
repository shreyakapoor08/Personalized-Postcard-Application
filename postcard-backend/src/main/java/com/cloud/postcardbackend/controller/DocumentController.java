package com.cloud.postcardbackend.controller;

import com.cloud.postcardbackend.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @PostMapping("/upload-document")
    public String uploadDocument(@RequestParam("file-document") MultipartFile file) throws IOException {
        return documentService.uploadDocument(file);
    }

    @GetMapping("/document/{id}")
    public ResponseEntity<String> getDocumentUrlById(@PathVariable Long id) {
        String documentUrl = documentService.getDocumentUrlById(id);
        return ResponseEntity.ok(documentUrl);
    }

}
