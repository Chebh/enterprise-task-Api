package com.example.enterprise_task_Api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.example.enterprise_task_Api")
public class EnterpriseTaskApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(EnterpriseTaskApiApplication.class, args);
    }
}