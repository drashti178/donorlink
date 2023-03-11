package com.example.server.controller;
import com.example.server.dao.NgoDao;
import com.example.server.dao.DonorDao;
import com.example.server.models.Donor;
import com.example.server.models.Ngo;
import com.example.server.security.TokenGenerator;
import com.example.server.services.NgoService;
import com.example.server.dto.AuthResponseDto;
import com.example.server.dto.NgoLoginDto;
import com.example.server.services.DonorService;
import com.example.server.dto.UserLoginDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@CrossOrigin("*")
@RestController
@RequestMapping("/auth")

public class AuthController {
    private AuthenticationManager authenticationManager;

    private TokenGenerator tokenGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, TokenGenerator tokenGenerator) {

        this.authenticationManager = authenticationManager;

        this.tokenGenerator = tokenGenerator;
    }
    @Autowired
    private NgoDao ngoDao;
    @Autowired
    private DonorDao donorDao;
    @Autowired
    private NgoService ngoService;
    @Autowired
    private DonorService donorService;

    private String userprofilepath = "C:/Users/Drashti Patel/Documents/GitHub/donorlink/client/public/images/userprofileImgs";

    private String ngoprofilepath = "C:/Users/Drashti Patel/Documents/GitHub/donorlink/client/public/images/ngoprofileImgs";
    private String certipath = "C:/Users/Drashti Patel/Documents/GitHub/donorlink/client/public/images/certiImgs";



    @PostMapping("ngo/signup")
    public ResponseEntity<String> addNgo(@RequestParam("data") String ngoBody, @RequestParam("profile") MultipartFile file1, @RequestParam("certificate") MultipartFile file2) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Ngo ngo= objectMapper.readValue(ngoBody,Ngo.class);
        if(ngoDao.existsByNgoname(ngo.getNgoname()))
        {
            return new ResponseEntity<>("Ngoname exist ", HttpStatus.BAD_REQUEST);
        }
        if(file1.isEmpty())
        {
            return new ResponseEntity<>("Provide profile Image", HttpStatus.BAD_REQUEST);

        }
        else{
            String filename = this.ngoService.uploadImage(ngoprofilepath,file1);
            System.out.println(filename);
            ngo.setProfileImgName(filename);
        }
        if(file2.isEmpty() )
        {
            return new ResponseEntity<>("Provide certificate Image", HttpStatus.BAD_REQUEST);

        }
        else{

            String filename = this.ngoService.uploadImage(certipath,file2);
            System.out.println(filename);
            ngo.setCertiImgName(filename);
        }


        ngoService.addNgo(ngo);
        return new ResponseEntity<>("Ngo registered successfully", HttpStatus.OK);
    }
    @PostMapping("/ngo/login")
    public ResponseEntity<AuthResponseDto> ngoLogin(@RequestBody NgoLoginDto logindto)
    {
        if(ngoDao.existsByEmail(logindto.getNgoname()))
        {
            logindto.setNgoname(ngoDao.findByEmail(logindto.getNgoname()).getNgoname());
        }
        Ngo ngo = ngoDao.findByNgoname(logindto.getNgoname());
        if(ngo!= null){
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(logindto.getNgoname(),logindto.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenGenerator.generateToken(authentication);


            return new ResponseEntity<>(new AuthResponseDto(token),HttpStatus.OK);
        }
       return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }

    @PostMapping("/user/signup")
    public ResponseEntity<String> addUser(@RequestParam("donorBody") String donorBody, @RequestParam("profile") MultipartFile file1) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Donor donor= objectMapper.readValue(donorBody, Donor.class);

        if(donorDao.existsByusername(donor.getUsername()))
        {
            return new ResponseEntity<>("Donorname already exist ", HttpStatus.BAD_REQUEST);
        }
        if(file1.isEmpty())
        {
            return new ResponseEntity<>("Provide profile Image", HttpStatus.BAD_REQUEST);

        }
        else{
            String filename = this.ngoService.uploadImage(userprofilepath,file1);
            System.out.println(filename);
            donor.setProfileImgName(filename);

        }
        donorService.addUser(donor);
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }
    @PostMapping("/user/login")
    public ResponseEntity<AuthResponseDto> userLogin(@RequestBody UserLoginDto logindto)
    {
        if(donorDao.existsByEmail(logindto.getUsername()))
        {
            logindto.setUsername(donorDao.findByEmail(logindto.getUsername()).getUsername());
        }
        Donor donor = donorDao.findByusername(logindto.getUsername());
        if(donor!= null) {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(logindto.getUsername(), logindto.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenGenerator.generateToken(authentication);

            return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }








}
