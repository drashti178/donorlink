package com.example.server.controller;

import com.example.server.models.Ngo;
import com.example.server.services.NgoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AuthController {

    @Autowired
    private NgoService ngoService;
    @GetMapping("/ngos")
    public List<Ngo> getNgos()
    {
        return this.ngoService.getNgos();
    }




}
