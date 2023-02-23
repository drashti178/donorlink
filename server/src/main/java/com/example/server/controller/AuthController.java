package com.example.server.controller;
import com.example.server.dao.NgoDao;
import com.example.server.dao.DonorDao;
import com.example.server.models.Donor;
import com.example.server.models.Ngo;
import com.example.server.security.TokenGenerator;
import com.example.server.services.NgoService;
import dto.AuthResponseDto;
import dto.NgoLoginDto;
import com.example.server.services.DonorService;
import dto.UserLoginDto;
import jakarta.annotation.security.RolesAllowed;
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


@CrossOrigin("*")
@RestController
@RequestMapping("/auth")

public class AuthController {
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;
    private TokenGenerator tokenGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager,
                         PasswordEncoder passwordEncoder, TokenGenerator tokenGenerator) {

        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
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

    @GetMapping("home")
    public String home(){
        return "Welcome to Donorlinker";
    }

    @PostMapping("/ngo/signup")
    public ResponseEntity<String> addNgo(@RequestBody Ngo ngo){

        if(ngoDao.existsByNgoname(ngo.getNgoname()))
        {
            return new ResponseEntity<>("Ngoname exist ", HttpStatus.BAD_REQUEST);
        }
        ngo.setPassword(passwordEncoder.encode(ngo.getPassword()));
        ngoDao.save(ngo);
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }
    @PostMapping("/ngo/login")
    public ResponseEntity<AuthResponseDto> ngoLogin(@RequestBody NgoLoginDto logindto)
    {
        if(donorDao.existsByEmail(logindto.getNgoname()))
        {
            logindto.setNgoname(ngoDao.findByEmail(logindto.getNgoname()).getNgoname());
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(logindto.getNgoname(),logindto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenGenerator.generateToken(authentication);


        return new ResponseEntity<>(new AuthResponseDto(token),HttpStatus.OK);

    }

    @PostMapping("/user/signup")
    public ResponseEntity<String> addUser(@RequestBody Donor donor){

        if(donorDao.existsByusername(donor.getUsername()))
        {
            return new ResponseEntity<>("Donorname already exist ", HttpStatus.BAD_REQUEST);
        }
        donor.setPassword(passwordEncoder.encode(donor.getPassword()));
        donorDao.save(donor);
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }
    @PostMapping("/user/login")
    public ResponseEntity<AuthResponseDto> userLogin(@RequestBody UserLoginDto logindto)
    {
        if(donorDao.existsByEmail(logindto.getUsername()))
        {
            logindto.setUsername(donorDao.findByEmail(logindto.getUsername()).getUsername());
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(logindto.getUsername(),logindto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenGenerator.generateToken(authentication);

        return new ResponseEntity<>(new AuthResponseDto(token),HttpStatus.OK);

    }







}
