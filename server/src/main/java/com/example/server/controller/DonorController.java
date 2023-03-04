package com.example.server.controller;

import com.example.server.dao.DonorDao;
import com.example.server.dao.NgoDao;
import com.example.server.models.Donor;
import com.example.server.models.Ngo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class DonorController {
    @Autowired
    private DonorDao donorDao;

    @Autowired
    private NgoDao ngoDao;
    @GetMapping("/")
    public String home()
    {
        return "user page";

    }
    @GetMapping("/role")
    public ResponseEntity<String> getRole(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Donor donor = donorDao.findByusername(username);
        if(donor != null){
            String role = donor.getRole();
            return new ResponseEntity<>(role, HttpStatus.OK);
        }
        Ngo ngo = ngoDao.findByNgoname(username);
        System.out.print(username);
        if(ngo != null)
            return new ResponseEntity<>("ngo",HttpStatus.OK);
        return new ResponseEntity<>("user",HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Donor> getUser(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Donor donor = donorDao.findByusername(username);
        if(donor == null){
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(donor,HttpStatus.OK);
    }

}
