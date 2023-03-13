package com.example.server.controller;

import com.example.server.models.Activity;
import com.example.server.models.Ngo;
import com.example.server.services.NgoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("getngos")
    public List<Ngo> getNgoByCategory(@RequestBody String cat)
    {
        cat=cat.substring(0,cat.length()-1);
        System.out.println(cat);
        System.out.println("inside");
        return ngoService.getNgosbywork(cat);
    }

}
