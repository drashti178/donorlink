package com.example.server.controller;

import com.example.server.models.Activity;
import com.example.server.models.Ngo;
import com.example.server.services.NgoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/home")
public class HomeController {
    @Autowired
    private NgoService ngoService;
    @GetMapping("ngos")
    public List<Ngo> getNgos()
    {
        return ngoService.getNgos();
    }

}
