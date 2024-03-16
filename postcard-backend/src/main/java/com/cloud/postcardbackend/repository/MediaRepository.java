package com.cloud.postcardbackend.repository;

import com.cloud.postcardbackend.entity.MediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaRepository extends JpaRepository<MediaEntity, Long> {
}


