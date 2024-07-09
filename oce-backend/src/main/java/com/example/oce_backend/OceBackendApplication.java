package com.example.oce_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class OceBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(OceBackendApplication.class, args);
	}
}
