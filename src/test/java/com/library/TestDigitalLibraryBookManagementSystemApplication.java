package com.library;

import org.springframework.boot.SpringApplication;

public class TestDigitalLibraryBookManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.from(DigitalLibraryBookManagementSystemApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
