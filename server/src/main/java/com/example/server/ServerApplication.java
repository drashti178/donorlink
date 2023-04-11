package com.example.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@SpringBootApplication
public class ServerApplication {

//    @Autowired
//    private JavaMailSender mailSender;

    public static void main(String[] args) {

        SpringApplication.run(ServerApplication.class, args);
    }
//    @EventListener(ApplicationReadyEvent.class)
//    public void sendMail() {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo("pateltilak2468@gmail.com");
//        message.setSubject("Password Reset");
//        message.setFrom("pateltilak9723@gmail.com");
//        message.setText("body");
//        mailSender.send(message);
//        System.out.println("Message Sent:- ");
//    }

}
