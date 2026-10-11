package com.example.enterprise_task_Api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.enterprise_task_Api")
@EntityScan(basePackages = "com.example.enterprise_task_Api")
public class EnterpriseTaskApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(EnterpriseTaskApiApplication.class, args);
    }
}