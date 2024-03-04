package com.cloud.postcardbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "postcard-voicenote")
public class VoiceNote {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "voicenote_url")
    private String url;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }


}

