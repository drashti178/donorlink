package com.example.server.controller;

import jakarta.annotation.security.RolesAllowed;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/")
    public String home()
    {
        return "user page";

    }

}
