package com.cloud.postcardbackend.repository;

import com.cloud.postcardbackend.entity.DocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<DocumentEntity, Long> {
}


