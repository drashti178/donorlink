package com.example.server.controller;

import com.example.server.dao.ActivityDao;
import com.example.server.dao.NgoDao;
import com.example.server.models.Activity;
import com.example.server.models.Ngo;
import com.example.server.security.TokenGenerator;
import com.example.server.services.NgoService;
import dto.AuthResponseDto;
import dto.NgoLoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class NgoController {

    @Autowired
    private ActivityDao activityDao;
    @PostMapping("ngo/addactivity")
    public ResponseEntity<String> addActivity(@RequestBody Activity activity){
        try{
            activityDao.save(activity);
        }
        catch (Exception e)
        {
            throw e;
        }
        return new ResponseEntity<>("Activity added succesfully",HttpStatus.OK);
    }

//    @GetMapping("ngo/showactivites")
//    public ResponseEntity<Activity> showActivities()
//    {
//        try{
//
//        }
//    }


}
