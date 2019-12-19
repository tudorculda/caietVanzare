package com.spero.vanzari;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VanzariApplication {
	
	@Autowired
	public static VanzareDao dao;

	public static void main(String[] args) {
		SpringApplication.run(VanzariApplication.class, args);		
	}

}
