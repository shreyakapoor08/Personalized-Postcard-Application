package com.cloud.postcardbackend.controller;

import com.cloud.postcardbackend.entity.MediaEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class Entry {
    @GetMapping("/")
    public ResponseEntity<String> serverRunning() {
        return ResponseEntity.ok().body("Spring Boot server running");
    }
}
