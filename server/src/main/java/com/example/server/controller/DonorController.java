package com.example.server.controller;

import com.example.server.dao.DonorDao;
import com.example.server.dao.NgoDao;
import com.example.server.models.Donation;
import com.example.server.models.Donor;
import com.example.server.models.Ngo;
import com.example.server.services.DonationService;
import com.example.server.services.DonorService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class DonorController {

    @Autowired
    private DonorDao donorDao;

    @Autowired
    private NgoDao ngoDao;

    @Autowired
    private DonorService donorService;

    @Autowired
    public Environment env;

    private String userprofilepath = "static/images/userprofileImgs";
    private PasswordEncoder passwordEncoder;

//    private DonorService donorService;

    public DonorController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/")
    public String home()
    {
        return "user page";

    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUser(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Donor donor = donorDao.findByusername(username);
        if(donor == null){
            Ngo ngo = ngoDao.findByNgoname(username);
            if(ngo != null)
                return new ResponseEntity<>(ngo,HttpStatus.OK);
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(donor,HttpStatus.OK);
    }

    @PutMapping("/edit")
    public ResponseEntity<String> updateUser(@RequestParam("data") String donorBody, @RequestParam("profile") MultipartFile file1) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Donor donor= objectMapper.readValue(donorBody, Donor.class);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Donor donor1 = donorDao.findByusername(username);

        if(file1.isEmpty())
        {
            return new ResponseEntity<>("Provide profile Image", HttpStatus.BAD_REQUEST);
        }
        else{
            String filename = this.donorService.uploadImage(userprofilepath,file1);
            System.out.println("123\n");
            System.out.println(filename);
            donor1.setProfileImgName(filename);
            System.out.println("Profile uploaded");
        }

        if(donor1.getUsername() != donor.getUsername()){
            if(donorDao.existsByusername(donor.getUsername())){
                return new ResponseEntity<>("Username already exist", HttpStatus.BAD_REQUEST);
            }
        }
        donor.setPassword(passwordEncoder.encode(donor.getPassword()));
        this.donorService.addDonor(donor);
        return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser() {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Donor donor = donorDao.findByusername(username);
        donorDao.delete(donor);
        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    }

}