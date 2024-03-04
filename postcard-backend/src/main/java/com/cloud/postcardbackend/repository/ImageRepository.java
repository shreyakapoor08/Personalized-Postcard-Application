package com.cloud.postcardbackend.repository;

import com.cloud.postcardbackend.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}


