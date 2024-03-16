package com.cloud.postcardbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {
		"com.cloud.postcardbackend"
})
@EnableJpaRepositories
public class PostcardBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(PostcardBackendApplication.class, args);
	}

}
